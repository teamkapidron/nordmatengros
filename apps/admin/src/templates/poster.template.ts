import * as fabric from 'fabric';

import { formatPrice } from '@/utils/price.util';
import { PreviewPromotionPosterRequest } from '@/hooks/usePromotion/types';

type PromotionPosterTemplateProps =
  PreviewPromotionPosterRequest['response']['data']['productsData'][0] & {
    posterType: 'new-arrival' | 'promotion';
    title: string;
  };

export async function promotionPosterTemplate(
  props: PromotionPosterTemplateProps,
) {
  const {
    name,
    image,
    price,
    pricePerUnit,
    bulkDiscount,
    expirationDate,
    title,
  } = props;

  const width = 768;
  const height = 768;

  const canvas = new fabric.Canvas(undefined, {
    width,
    height,
    backgroundColor: '#ffffff',
  });

  try {
    const backgroundGradient = new fabric.Gradient({
      type: 'radial',
      coords: {
        x1: width / 2,
        y1: height / 2,
        x2: width / 2,
        y2: height / 2,
        r1: 0,
        r2: width * 0.8,
      },
      colorStops: [
        { offset: 0, color: '#f0f9ff' },
        { offset: 0.3, color: '#e0f2fe' },
        { offset: 0.7, color: '#f8fafc' },
        { offset: 1, color: '#f1f5f9' },
      ],
    });

    const background = new fabric.Rect({
      left: 0,
      top: 0,
      width: width,
      height: height,
      fill: backgroundGradient,
      selectable: false,
    });
    canvas.add(background);

    const headerGradient = new fabric.Gradient({
      type: 'linear',
      coords: { x1: 0, y1: 0, x2: width, y2: 120 },
      colorStops: [
        { offset: 0, color: '#1e293b' },
        { offset: 0.3, color: '#334155' },
        { offset: 0.7, color: '#475569' },
        { offset: 1, color: '#1e293b' },
      ],
    });

    const headerRect = new fabric.Rect({
      left: 0,
      top: 0,
      width: width,
      height: 120,
      fill: headerGradient,
      selectable: false,
      shadow: new fabric.Shadow({
        color: 'rgba(30, 41, 59, 0.4)',
        blur: 20,
        offsetX: 0,
        offsetY: 8,
      }),
    });
    canvas.add(headerRect);

    const patternRect = new fabric.Rect({
      left: 0,
      top: 0,
      width: width,
      height: 120,
      fill: 'rgba(255, 255, 255, 0.03)',
      selectable: false,
    });
    canvas.add(patternRect);

    await new Promise<void>((resolve) => {
      fabric.FabricImage.fromURL(
        'https://baladi-prod-baladibucket-fedmxzsx.s3.eu-central-1.amazonaws.com/products/baladi.png',
        {
          crossOrigin: 'anonymous',
        },
      ).then((logo) => {
        if (logo) {
          const logoMaxWidth = 270;
          const logoMaxHeight = 80;
          const logoWidth = logo.width || 1;
          const logoHeight = logo.height || 1;
          const logoScale = Math.min(
            logoMaxWidth / logoWidth,
            logoMaxHeight / logoHeight,
          );

          logo.set({
            left: width / 2,
            top: 20,
            originX: 'center',
            originY: 'top',
            scaleX: logoScale,
            scaleY: logoScale,
            selectable: false,
            shadow: new fabric.Shadow({
              color: 'rgba(255, 255, 255, 0.3)',
              blur: 8,
              offsetX: 0,
              offsetY: 2,
            }),
          });

          canvas.add(logo);
        }
        resolve();
      });
    });

    const productTitle = new fabric.Text(name.toUpperCase(), {
      left: width / 2,
      top: 140,
      fontSize: 28,
      fontFamily: 'Arial, sans-serif',
      fill: '#1e293b',
      fontWeight: 'bold',
      textAlign: 'center',
      originX: 'center',
      originY: 'top',
      letterSpacing: 1,
      selectable: false,
      shadow: new fabric.Shadow({
        color: 'rgba(30, 41, 59, 0.1)',
        blur: 4,
        offsetX: 0,
        offsetY: 2,
      }),
    });
    canvas.add(productTitle);

    await new Promise<void>((resolve, reject) => {
      fabric.FabricImage.fromURL(image, {
        crossOrigin: 'anonymous',
      })
        .then((img) => {
          if (img) {
            const maxWidth = 320;
            const maxHeight = 320;
            const imgWidth = img.width || 1;
            const imgHeight = img.height || 1;

            const scale = Math.min(maxWidth / imgWidth, maxHeight / imgHeight);

            img.set({
              left: width / 2,
              top: 350,
              originX: 'center',
              originY: 'center',
              scaleX: scale,
              scaleY: scale,
              selectable: false,
              shadow: new fabric.Shadow({
                color: 'rgba(30, 41, 59, 0.2)',
                blur: 15,
                offsetX: 0,
                offsetY: 5,
              }),
            });

            canvas.add(img);
          }
          resolve();
        })
        .catch(reject);
    });

    const priceSectionGradient = new fabric.Gradient({
      type: 'linear',
      coords: { x1: 0, y1: 0, x2: 0, y2: 200 },
      colorStops: [
        { offset: 0, color: '#ffffff' },
        { offset: 1, color: '#f8fafc' },
      ],
    });

    const priceSection = new fabric.Rect({
      left: 60,
      top: 520,
      width: width - 120,
      height: 200,
      fill: priceSectionGradient,
      stroke: '#e2e8f0',
      strokeWidth: 1,
      rx: 20,
      ry: 20,
      shadow: new fabric.Shadow({
        color: 'rgba(30, 41, 59, 0.12)',
        blur: 20,
        offsetX: 0,
        offsetY: 8,
      }),
      selectable: false,
    });
    canvas.add(priceSection);

    const regularPrice = new fabric.Text(`${formatPrice(price)} kr`, {
      left: width / 2,
      top: 440,
      fontSize: 32,
      fontFamily: 'Georgia, serif',
      fill: '#1e293b',
      fontWeight: 'bold',
      textAlign: 'center',
      originX: 'center',
      originY: 'top',
      selectable: false,
      shadow: new fabric.Shadow({
        color: 'rgba(30, 41, 59, 0.2)',
        blur: 4,
        offsetX: 0,
        offsetY: 2,
      }),
    });
    canvas.add(regularPrice);

    const perUnitText = new fabric.Text(
      `Per enhet: ${formatPrice(pricePerUnit)} kr`,
      {
        left: width / 2,
        top: 480,
        fontSize: 14,
        fontFamily: 'Arial, sans-serif',
        fill: '#64748b',
        textAlign: 'center',
        originX: 'center',
        originY: 'top',
        selectable: false,
      },
    );
    canvas.add(perUnitText);

    if (bulkDiscount && bulkDiscount.length > 0) {
      const bulkTitle = new fabric.Text('BULKRABATT', {
        left: width / 2,
        top: 550,
        fontSize: 18,
        fontFamily: 'Arial, sans-serif',
        fill: '#059669',
        fontWeight: 'bold',
        textAlign: 'center',
        originX: 'center',
        originY: 'top',
        letterSpacing: 1,
        selectable: false,
      });
      canvas.add(bulkTitle);

      bulkDiscount.forEach((discount, index) => {
        const yPosition = 580 + index * 30;

        const discountText = new fabric.Text(
          `${formatPrice(discount.price)} kr hver kartong (${formatPrice(discount.pricePerUnit)} per enhet) (${discount.minQuantity}+ antall)`,
          {
            left: width / 2,
            top: yPosition,
            fontSize: 14,
            fontFamily: 'Arial, sans-serif',
            fill: '#059669',
            fontWeight: '600',
            textAlign: 'center',
            originX: 'center',
            originY: 'top',
            selectable: false,
          },
        );
        canvas.add(discountText);
      });
    }

    if (expirationDate) {
      const expirationDateText = new fabric.Text(`Utgår: ${expirationDate}`, {
        left: width / 2,
        top: 680,
        fontSize: 14,
        fontFamily: 'Arial, sans-serif',
        fill: '#64748b',
        textAlign: 'center',
        originX: 'center',
        originY: 'top',
        selectable: false,
      });
      canvas.add(expirationDateText);
    }

    canvas.renderAll();

    const link = document.createElement('a');
    link.href = canvas.toDataURL({
      format: 'png',
      quality: 1,
      multiplier: 2,
    });
    link.download = `${title}.png`;
    link.click();
  } catch (error) {
    console.error('Error creating promotion poster:', error);
    throw error;
  }
}

type MultiProductPosterTemplateProps =
  PreviewPromotionPosterRequest['response']['data'] & {
    posterType: 'new-arrival' | 'promotion';
    title: string;
  };

export async function multiProductPosterTemplate(
  props: MultiProductPosterTemplateProps,
) {
  const { productsData, title, posterType } = props;

  const width = 768;
  const height = 768;

  const canvas = new fabric.Canvas(undefined, {
    width,
    height,
    backgroundColor: '#ffffff',
  });

  try {
    const backgroundGradient = new fabric.Gradient({
      type: 'radial',
      coords: {
        x1: width / 2,
        y1: height / 2,
        x2: width / 2,
        y2: height / 2,
        r1: 0,
        r2: width * 0.8,
      },
      colorStops: [
        { offset: 0, color: '#f0f9ff' },
        { offset: 0.3, color: '#e0f2fe' },
        { offset: 0.7, color: '#f8fafc' },
        { offset: 1, color: '#f1f5f9' },
      ],
    });

    const background = new fabric.Rect({
      left: 0,
      top: 0,
      width: width,
      height: height,
      fill: backgroundGradient,
      selectable: false,
    });
    canvas.add(background);

    const headerGradient = new fabric.Gradient({
      type: 'linear',
      coords: { x1: 0, y1: 0, x2: width, y2: 120 },
      colorStops: [
        { offset: 0, color: '#1e293b' },
        { offset: 0.3, color: '#334155' },
        { offset: 0.7, color: '#475569' },
        { offset: 1, color: '#1e293b' },
      ],
    });

    const headerRect = new fabric.Rect({
      left: 0,
      top: 0,
      width: width,
      height: 120,
      fill: headerGradient,
      selectable: false,
      shadow: new fabric.Shadow({
        color: 'rgba(30, 41, 59, 0.4)',
        blur: 20,
        offsetX: 0,
        offsetY: 8,
      }),
    });
    canvas.add(headerRect);

    await new Promise<void>((resolve) => {
      fabric.FabricImage.fromURL(
        'https://baladi-prod-baladibucket-fedmxzsx.s3.eu-central-1.amazonaws.com/products/baladi.png',
        {
          crossOrigin: 'anonymous',
        },
      ).then((logo) => {
        if (logo) {
          const logoMaxWidth = 210;
          const logoMaxHeight = 60;
          const logoWidth = logo.width || 1;
          const logoHeight = logo.height || 1;
          const logoScale = Math.min(
            logoMaxWidth / logoWidth,
            logoMaxHeight / logoHeight,
          );

          logo.set({
            left: width / 2,
            top: 15,
            originX: 'center',
            originY: 'top',
            scaleX: logoScale,
            scaleY: logoScale,
            selectable: false,
            shadow: new fabric.Shadow({
              color: 'rgba(255, 255, 255, 0.3)',
              blur: 8,
              offsetX: 0,
              offsetY: 2,
            }),
          });

          canvas.add(logo);
        }
        resolve();
      });
    });

    const titleText =
      posterType === 'new-arrival' ? 'NYE ANKOMSTER' : 'KAMPANJEPRODUKTER';
    const posterTitle = new fabric.Text(titleText, {
      left: width / 2,
      top: 85,
      fontSize: 18,
      fontFamily: 'Arial, sans-serif',
      fill: '#ffffff',
      fontWeight: 'bold',
      textAlign: 'center',
      originX: 'center',
      originY: 'top',
      letterSpacing: 1.5,
      selectable: false,
      shadow: new fabric.Shadow({
        color: 'rgba(0, 0, 0, 0.3)',
        blur: 4,
        offsetX: 0,
        offsetY: 2,
      }),
    });
    canvas.add(posterTitle);

    const maxProducts = Math.min(productsData.length, 6);
    const products = productsData.slice(0, maxProducts);

    const cols = maxProducts <= 2 ? 1 : 2;
    const rows = Math.ceil(maxProducts / cols);

    const productAreaTop = 140;
    const productAreaHeight = height - productAreaTop - 40;
    const productHeight = productAreaHeight / rows;
    const productWidth = width / cols;

    const rowSpacing = 20;

    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      if (!product) continue;

      const row = Math.floor(i / cols);
      const col = i % cols;

      const isLastOddProduct =
        i === products.length - 1 && products.length % 2 === 1 && cols === 2;

      let x, currentProductWidth;
      if (isLastOddProduct) {
        x = 0;
        currentProductWidth = width;
      } else {
        x = col * productWidth;
        currentProductWidth = productWidth;
      }

      const y = productAreaTop + row * (productHeight + rowSpacing);

      const productBg = new fabric.Rect({
        left: x + 15,
        top: y + 10,
        width: currentProductWidth - 30,
        height: productHeight - 20,
        fill: 'rgba(255, 255, 255, 0.7)',
        stroke: '#e2e8f0',
        strokeWidth: 1,
        rx: 12,
        ry: 12,
        shadow: new fabric.Shadow({
          color: 'rgba(30, 41, 59, 0.1)',
          blur: 10,
          offsetX: 0,
          offsetY: 4,
        }),
        selectable: false,
      });
      canvas.add(productBg);

      const productName = new fabric.Text(product.name, {
        left: x + currentProductWidth / 2,
        top: y + 20,
        fontSize: 14,
        fontFamily: 'Arial, sans-serif',
        fill: '#1e293b',
        fontWeight: 'bold',
        textAlign: 'center',
        originX: 'center',
        originY: 'top',
        selectable: false,
      });
      canvas.add(productName);

      await new Promise<void>((resolve) => {
        fabric.FabricImage.fromURL(product.image, {
          crossOrigin: 'anonymous',
        })
          .then((img) => {
            if (img) {
              const maxImgWidth = currentProductWidth - 75;
              const maxImgHeight = productHeight - 120;
              const imgWidth = img.width || 1;
              const imgHeight = img.height || 1;

              const scale = Math.min(
                maxImgWidth / imgWidth,
                maxImgHeight / imgHeight,
              );

              img.set({
                left: x + currentProductWidth / 2,
                top: y + productHeight / 2 - 15,
                originX: 'center',
                originY: 'center',
                scaleX: scale,
                scaleY: scale,
                selectable: false,
                shadow: new fabric.Shadow({
                  color: 'rgba(30, 41, 59, 0.15)',
                  blur: 8,
                  offsetX: 0,
                  offsetY: 3,
                }),
              });

              canvas.add(img);
            }
            resolve();
          })
          .catch(() => resolve());
      });

      const priceText = new fabric.Text(`${formatPrice(product.price)} kr`, {
        left: x + currentProductWidth / 2,
        top: y + productHeight - 65,
        fontSize: 16,
        fontFamily: 'Georgia, serif',
        fill: '#059669',
        fontWeight: 'bold',
        textAlign: 'center',
        originX: 'center',
        originY: 'top',
        selectable: false,
      });
      canvas.add(priceText);

      const perUnitText = new fabric.Text(
        `Per enhet: ${formatPrice(product.pricePerUnit)} kr`,
        {
          left: x + currentProductWidth / 2,
          top: y + productHeight - 45,
          fontSize: 11,
          fontFamily: 'Arial, sans-serif',
          fill: '#64748b',
          textAlign: 'center',
          originX: 'center',
          originY: 'top',
          selectable: false,
        },
      );
      canvas.add(perUnitText);

      if (product.expirationDate) {
        const expirationDateText = new fabric.Text(
          `Utgår: ${product.expirationDate}`,
          {
            left: x + currentProductWidth / 2,
            top: y + productHeight - 25,
            fontSize: 11,
            fontFamily: 'Arial, sans-serif',
            fill: '#64748b',
            textAlign: 'center',
            originX: 'center',
            originY: 'top',
            selectable: false,
          },
        );
        canvas.add(expirationDateText);
      }
    }

    const link = document.createElement('a');
    link.href = canvas.toDataURL({
      format: 'png',
      quality: 1,
      multiplier: 2,
    });
    link.download = `${title}-multi-products.png`;
    link.click();
  } catch (error) {
    console.error('Error creating multi-product poster:', error);
    throw error;
  }
}
