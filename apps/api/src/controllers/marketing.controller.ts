// Node Modules
import { Types } from 'mongoose';
import { formatDate } from 'date-fns';

// Schemas
import Product from '@/models/product.model';
import Campaign from '@/models/campaign.model';
import Subscriber from '@/models/subscriber.model';
import BulkDiscount from '@/models/bulkDiscount.model';

// Utils
import { sendResponse } from '@/utils/common/response.util';
import {
  newArrivalTemplate,
  productPromotionTemplate,
} from '@/templates/newsletter.template';
import { sendMail } from '@/utils/common/mail.util';

// Handlers
import { asyncHandler } from '@/handlers/async.handler';
import { ErrorHandler } from '@/handlers/error.handler';

// Types
import type {
  CreateCampaignSchema,
  NewsLetterPreviewSchema,
  PreviewPromotionPosterSchema,
  SendContactFormSchema,
  UnsubscribeSchema,
} from '@/validators/marketing.validator';
import type { Request, Response } from 'express';
import { CampaignType } from '@repo/types/campaign';
import { SubscriberStatus } from '@repo/types/subscribers';
import { SubscriberWithUser } from '@/types/marketing.types';

export const newsletterStats = asyncHandler(
  async (_: Request, res: Response) => {
    const campaignCount = await Campaign.find().countDocuments();
    const subscriberCount = await Subscriber.find().countDocuments();
    const unsubscribedSubscribers = await Subscriber.find({
      status: SubscriberStatus.UNSUBSCRIBED,
    }).countDocuments();

    sendResponse(res, 200, 'Newsletter stats fetched successfully', {
      campaignCount,
      subscriberCount,
      unsubscribedSubscribers,
    });
  },
);

export const createCampaign = asyncHandler(
  async (req: Request, res: Response) => {
    const { title, description, type, productsIds } =
      req.body as CreateCampaignSchema['body'];

    const products = await Product.find({ _id: { $in: productsIds } });

    if (products.length !== productsIds.length) {
      throw new ErrorHandler(400, 'Some products are not found', 'BAD_REQUEST');
    }

    const campaign = await Campaign.create({
      title,
      description,
      type,
      productsIds,
    });

    const subscribers = await Subscriber.find<SubscriberWithUser>({
      status: SubscriberStatus.SUBSCRIBED,
    }).populate({
      path: 'userId',
      select: 'email name',
    });

    const productsData = products.map((product) => ({
      _id: product._id?.toString() ?? '',
      name: product.name,
      price: product.salePrice,
      image: product.images?.[0] ?? '',
      vat: product.vat,
      noOfUnits: product.noOfUnits,
    }));

    subscribers.forEach((subscriber) => {
      (async () => {
        try {
          await sendMail({
            to: subscriber.userId.email,
            subject: title,
            template: {
              type:
                type === CampaignType.NEW_ARRIVAL ? 'newArrival' : 'promotion',
              data: {
                customerName: subscriber.userId.name,
                products: productsData,
                email: subscriber.userId.email,
              },
            },
          });
        } catch (err) {
          console.error(
            `Failed to send mail to ${subscriber.userId.email}:`,
            err,
          );
        }
      })();
    });

    sendResponse(res, 201, 'Campaign created successfully', { campaign });
  },
);

export const newsLetterPreview = asyncHandler(
  async (req: Request, res: Response) => {
    const { type, productsIds } = req.body as NewsLetterPreviewSchema['body'];

    const products = await Product.find({ _id: { $in: productsIds } }).lean();

    if (products.length !== productsIds.length) {
      throw new ErrorHandler(400, 'Some products are not found', 'BAD_REQUEST');
    }

    let html = '';

    const productsData = products.map((product) => ({
      _id: product._id.toString(),
      name: product.name,
      price: product.salePrice,
      image: product.images?.[0] ?? '',
      vat: product.vat,
      noOfUnits: product.noOfUnits,
    }));

    if (type === CampaignType.NEW_ARRIVAL) {
      html = newArrivalTemplate(productsData);
    } else if (type === CampaignType.PROMOTION) {
      html = productPromotionTemplate(productsData);
    }

    sendResponse(res, 200, 'Newsletter preview fetched successfully', { html });
  },
);

export const previewPromotionPoster = asyncHandler(
  async (req: Request, res: Response) => {
    const { posterType, productsIds } =
      req.body as PreviewPromotionPosterSchema['body'];

    const ids = productsIds.map((id) => new Types.ObjectId(id));

    const products = await Product.aggregate([
      {
        $match: {
          _id: { $in: ids },
        },
      },
      {
        $lookup: {
          from: 'inventories',
          localField: '_id',
          foreignField: 'productId',
          as: 'inventory',
        },
      },
      {
        $addFields: {
          stock: {
            $sum: {
              $map: {
                input: '$inventory',
                as: 'inv',
                in: { $ifNull: ['$$inv.quantity', 0] },
              },
            },
          },
          bestBeforeDate: { $min: '$inventory.expirationDate' },
        },
      },
      {
        $project: {
          inventory: 0,
        },
      },
    ]);

    if (products.length !== productsIds.length) {
      throw new ErrorHandler(400, 'Some products are not found', 'BAD_REQUEST');
    }

    const bulkDiscounts = await BulkDiscount.find();

    const productsData = products.map((product) => {
      const price = product.salePrice * (1 + product.vat / 100);

      return {
        name: product.name,
        price,
        image: product.images?.[0] ?? '',
        pricePerUnit: product.salePrice / product.noOfUnits,
        bulkDiscount: bulkDiscounts.map((bulkDiscount) => ({
          minQuantity: bulkDiscount.minQuantity,
          price: price * (1 - bulkDiscount.discountPercentage / 100),
          pricePerUnit:
            (price * (1 - bulkDiscount.discountPercentage / 100)) /
            product.noOfUnits,
        })),
        expirationDate: product.bestBeforeDate
          ? formatDate(product.bestBeforeDate, 'dd/MM/yyyy')
          : null,
      };
    });

    sendResponse(res, 200, 'Promotion poster preview fetched successfully', {
      productsData,
    });
  },
);

export const sendContactForm = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, email, phone, company, subject, message } =
      req.body as SendContactFormSchema['body'];
    const contactEmail = process.env.CONTACT_EMAIL;

    if (!contactEmail) {
      throw new ErrorHandler(
        500,
        'Contact email is not set',
        'INTERNAL_SERVER',
      );
    }

    sendMail({
      to: contactEmail,
      subject: 'Ny henvendelse fra kontaktskjema',
      template: {
        type: 'contactUs',
        data: {
          name,
          email,
          phone,
          company,
          subject,
          message,
          submittedAt: formatDate(new Date(), 'dd/MM/yyyy HH:mm'),
        },
      },
    }).catch((error) => {
      console.log(error);
    });

    sendResponse(res, 200, 'Contact form sent successfully');
  },
);

export const unsubscribe = asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.query as UnsubscribeSchema['query'];

  await Subscriber.updateOne(
    { email },
    { status: SubscriberStatus.UNSUBSCRIBED },
  );

  sendResponse(res, 200, 'Unsubscribed successfully');
});
