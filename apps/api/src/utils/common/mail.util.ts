import { createTransport } from 'nodemailer';
import { MailOptions } from 'nodemailer/lib/smtp-transport';

import {
  otpVerificationTemplate,
  adminApprovalTemplate,
  passwordResetTemplate,
  adminCredentialsTemplate,
  userApprovalTemplate,
  orderPlacedTemplate,
  contactUsTemplate,
} from '@/templates/mail.template';
import { inventoryAlertTemplate } from '@/templates/cron.template';
import {
  newArrivalTemplate,
  productPromotionTemplate,
} from '@/templates/newsletter.template';

import { MailTemplate } from './interfaces/mail';

interface ISendMail {
  to: string;
  subject: string;
  template: MailTemplate;
  attachments?: Array<{
    filename: string;
    content: Buffer;
    contentType?: string;
  }>;
}

function getTemplate(template: MailTemplate) {
  switch (template.type) {
    case 'verifyEmail': {
      return otpVerificationTemplate(template.data.name, template.data.otp);
    }
    case 'adminApproval': {
      return adminApprovalTemplate(
        template.data.name,
        template.data.email,
        template.data.userId,
        template.data.createdAt,
      );
    }

    case 'passwordReset': {
      return passwordResetTemplate(template.data.name, template.data.resetLink);
    }
    case 'adminCredentials': {
      return adminCredentialsTemplate(
        template.data.name,
        template.data.password,
      );
    }
    case 'userApprovalConfirmation': {
      return userApprovalTemplate(template.data.name, template.data.email);
    }
    case 'inventoryAlert': {
      return inventoryAlertTemplate(template.data);
    }
    case 'orderPlaced': {
      return orderPlacedTemplate(template.data.order);
    }
    case 'contactUs': {
      return contactUsTemplate(
        template.data.name,
        template.data.email,
        template.data.phone,
        template.data.company,
        template.data.subject,
        template.data.message,
        template.data.submittedAt,
      );
    }
    case 'newArrival': {
      return newArrivalTemplate(
        template.data.products,
        template.data.customerName,
      );
    }
    case 'promotion': {
      return productPromotionTemplate(
        template.data.products,
        template.data.customerName,
      );
    }
  }
}

export async function sendMail(options: ISendMail) {
  const haveAllRequiredEnvVars = [
    process.env.SMTP_HOST,
    process.env.SMTP_PORT,
    process.env.SMTP_USERNAME,
    process.env.SMTP_PASSWORD,
    process.env.SMTP_NAME,
    process.env.SMTP_MAIL,
    process.env.SMTP_REPLY_TO,
  ].every((envVar) => envVar !== undefined);

  if (!haveAllRequiredEnvVars) {
    throw new Error('Missing required environment variables for email sending');
  }

  const transporter = createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT!),
    secure: process.env.SMTP_PORT === '465',
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const mailOptions: MailOptions = {
    from: {
      name: process.env.SMTP_NAME!,
      address: process.env.SMTP_MAIL!,
    },
    replyTo: process.env.SMTP_REPLY_TO!,
    to: options.to,
    subject: options.subject,
    html: getTemplate(options.template),
  };

  await transporter.sendMail(mailOptions);
}
