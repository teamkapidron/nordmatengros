interface InventoryAlertTemplateProps {
  products: {
    productName: string;
    productImage: string;
    totalQuantity: number;
  }[];
}

export function inventoryAlertTemplate(props: InventoryAlertTemplateProps) {
  const { products } = props;

  const currentDate = new Date().toLocaleDateString('no-NO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return `
<!DOCTYPE html>
<html lang="no">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lagervarsel - Produkter utløper snart</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333333;
            background-color: #f8fafc;
        }
        
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        
        .header {
            background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
            color: white;
            padding: 32px 24px;
            text-align: center;
        }
        
        .header h1 {
            font-size: 28px;
            font-weight: 700;
            margin-bottom: 8px;
        }
        
        .header p {
            font-size: 16px;
            opacity: 0.9;
        }
        
        .alert-icon {
            width: 48px;
            height: 48px;
            margin: 0 auto 16px;
            background-color: rgba(255, 255, 255, 0.2);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
        }
        
        .content {
            padding: 32px 24px;
        }
        
        .intro {
            text-align: center;
            margin-bottom: 32px;
        }
        
        .intro h2 {
            font-size: 22px;
            color: #1f2937;
            margin-bottom: 12px;
        }
        
        .intro p {
            font-size: 16px;
            color: #6b7280;
            line-height: 1.5;
        }
        
        .date-badge {
            display: inline-block;
            background-color: #fef3c7;
            color: #92400e;
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 600;
            margin-top: 8px;
        }
        
        .products-grid {
            display: grid;
            gap: 16px;
        }
        
        .product-card {
            background-color: #f9fafb;
            border: 1px solid #e5e7eb;
            border-radius: 12px;
            padding: 20px;
            display: flex;
            align-items: center;
            gap: 16px;
            transition: all 0.2s ease;
        }
        
        .product-card:hover {
            border-color: #dc2626;
            box-shadow: 0 2px 8px rgba(220, 38, 38, 0.1);
        }
        
        .product-image {
            width: 64px;
            height: 64px;
            border-radius: 8px;
            object-fit: cover;
            border: 2px solid #e5e7eb;
        }
        
        .product-info {
            flex: 1;
        }
        
        .product-name {
            font-size: 18px;
            font-weight: 600;
            color: #1f2937;
            margin-bottom: 4px;
        }
        
        .product-quantity {
            font-size: 14px;
            color: #6b7280;
        }
        
        .quantity-badge {
            background-color: #fee2e2;
            color: #dc2626;
            padding: 4px 8px;
            border-radius: 6px;
            font-weight: 600;
            font-size: 12px;
            margin-left: 8px;
        }
        
        .cta-section {
            margin-top: 32px;
            text-align: center;
            padding: 24px;
            background-color: #f3f4f6;
            border-radius: 12px;
        }
        
        .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
            color: white;
            text-decoration: none;
            padding: 14px 28px;
            border-radius: 8px;
            font-weight: 600;
            font-size: 16px;
            transition: all 0.2s ease;
        }
        
        .cta-button:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
        }
        
        .footer {
            background-color: #1f2937;
            color: #9ca3af;
            padding: 24px;
            text-align: center;
        }
        
        .footer p {
            font-size: 14px;
            margin-bottom: 8px;
        }
        
        .footer a {
            color: #dc2626;
            text-decoration: none;
        }
        
        @media (max-width: 600px) {
            .container {
                margin: 0 16px;
            }
            
            .header {
                padding: 24px 16px;
            }
            
            .header h1 {
                font-size: 24px;
            }
            
            .content {
                padding: 24px 16px;
            }
            
            .product-card {
                flex-direction: column;
                text-align: center;
            }
            
            .product-image {
                width: 80px;
                height: 80px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="alert-icon">⚠️</div>
            <h1>Lagervarsel</h1>
            <p>Produkter utløper snart</p>
        </div>
        
        <div class="content">
            <div class="intro">
                <h2>Viktig melding om lagerbeholdning</h2>
                <p>Følgende produkter i lageret vil utløpe innen <strong>30 dager</strong> fra i dag.</p>
                <div class="date-badge">Dato: ${currentDate}</div>
            </div>
            
            <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse: collapse;">
            ${products
              .map(
                (product) => `
                <tr>
                <td style="padding: 12px 0;">
                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="border: 1px solid #e5e7eb; border-radius: 12px; background-color: #f9fafb;">
                    <tr>
                        <td style="padding: 16px; vertical-align: top;">
                        <img src="${product.productImage}" alt="${product.productName}" width="64" height="64" style="border-radius: 8px; object-fit: cover; border: 2px solid #e5e7eb;" onerror="this.style.display='none'" />
                        </td>
                        <td style="padding: 16px; vertical-align: top;">
                        <div style="font-size: 16px; font-weight: 600; color: #1f2937; margin-bottom: 6px;">${product.productName}</div>
                        <div style="font-size: 14px; color: #6b7280;">
                            Beholdning: ${product.totalQuantity} enheter
                            <span style="background-color: #fee2e2; color: #dc2626; padding: 2px 6px; border-radius: 6px; font-weight: 600; font-size: 12px; margin-left: 8px;">Utløper snart</span>
                        </div>
                        </td>
                    </tr>
                    </table>
                </td>
                </tr>
                `,
              )
              .join('')}
            </table>

            
            <div class="cta-section">
                <p style="margin-bottom: 16px; color: #374151; font-size: 16px;">
                    <strong>Handling kreves:</strong> Vurder å lage tilbud, øke markedsføringen eller kontakte leverandører for disse produktene.
                </p>
                <a href="${process.env.ADMIN_URL}/dashboard/inventory" class="cta-button">Gå til lageroversikt</a>
            </div>
        </div>
        
        <div class="footer">
            <p><strong>Baladi Admin System</strong></p>
            <p>Denne e-posten ble sendt automatisk fra vårt lagersystem.</p>
            <p>For spørsmål, kontakt <a href="mailto:support@baladi.no">support@baladi.no</a></p>
        </div>
    </div>
</body>
</html>
  `;
}
