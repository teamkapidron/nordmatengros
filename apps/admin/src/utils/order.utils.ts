import { OrderResponse } from '@/hooks/useOrder/types';
import { downloadPdfFromHtmlString } from './pdf.utils';
import { formatDate } from '@repo/ui/lib/date';
import { OrderStatus } from '@repo/types/order';

export async function printOrder(order: OrderResponse) {
  const htmlContent = generateOrderPdfHtml(order);
  const fileName = `ordre-${order._id.slice(-8).toUpperCase()}-${formatDate(new Date(), 'yyyy-MM-dd')}.pdf`;
  await downloadPdfFromHtmlString(htmlContent, fileName, 'a4');
}

function generateOrderPdfHtml(order: OrderResponse): string {
  const subtotal = order.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const total = order.totalAmount;
  const difference = total - subtotal;
  const shipping = difference > 0 ? Math.round(difference * 0.2) : 0;
  const tax = difference > 0 ? Math.round(difference * 0.8) : 0;

  return `
    <!DOCTYPE html>
    <html lang="no">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Ordre ${order._id.slice(-8).toUpperCase()}</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=DM+Sans:wght@400;500;600&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'DM Sans', sans-serif;
          line-height: 1.6;
          color: #1a1a1a;
          background: #ffffff;
          padding: 40px;
          max-width: 800px;
          margin: 0 auto;
        }
        
        .header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 40px;
          padding-bottom: 30px;
          border-bottom: 3px solid #183c6c;
          position: relative;
        }
        
        .header::after {
          content: '';
          position: absolute;
          bottom: -3px;
          left: 0;
          width: 100px;
          height: 3px;
          background: linear-gradient(90deg, #ff9f45, #ffa726);
        }
        
        .company-info {
          flex: 1;
        }
        
        .company-name {
          font-family: 'Sora', sans-serif;
          font-size: 32px;
          font-weight: 700;
          color: #183c6c;
          margin-bottom: 8px;
          letter-spacing: -0.5px;
        }
        
        .company-tagline {
          font-size: 14px;
          color: #4b7bbe;
          margin-bottom: 20px;
          font-weight: 500;
        }
        
        .company-details {
          font-size: 12px;
          color: #666;
          line-height: 1.8;
        }
        
        .invoice-info {
          text-align: right;
          flex-shrink: 0;
        }
        
        .invoice-title {
          font-family: 'Sora', sans-serif;
          font-size: 28px;
          font-weight: 600;
          color: #183c6c;
          margin-bottom: 10px;
        }
        
        .invoice-number {
          font-size: 16px;
          font-weight: 600;
          color: #ff9f45;
          margin-bottom: 5px;
        }
        
        .invoice-date {
          font-size: 14px;
          color: #666;
        }
        
        .status-badge {
          display: inline-block;
          padding: 6px 16px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          margin-top: 10px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .status-pending { background: #fef3c7; color: #92400e; }
        .status-confirmed { background: #dbeafe; color: #1e40af; }
        .status-shipped { background: #e0e7ff; color: #5b21b6; }
        .status-delivered { background: #d1fae5; color: #065f46; }
        .status-cancelled { background: #fee2e2; color: #991b1b; }
        
        .customer-section {
          display: flex;
          justify-content: space-between;
          margin: 40px 0;
          gap: 40px;
        }
        
        .customer-info, .shipping-info {
          flex: 1;
          background: #f8fafc;
          padding: 25px;
          border-radius: 12px;
          border-left: 4px solid #183c6c;
        }
        
        .section-title {
          font-family: 'Sora', sans-serif;
          font-size: 16px;
          font-weight: 600;
          color: #183c6c;
          margin-bottom: 15px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .section-title::before {
          content: '';
          width: 6px;
          height: 6px;
          background: #ff9f45;
          border-radius: 50%;
        }
        
        .customer-details {
          font-size: 14px;
          line-height: 1.8;
        }
        
        .customer-name {
          font-weight: 600;
          color: #1a1a1a;
          font-size: 16px;
          margin-bottom: 8px;
        }
        
        .items-table {
          width: 100%;
          border-collapse: collapse;
          margin: 40px 0;
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        
        .items-table th {
          background: linear-gradient(135deg, #183c6c, #4b7bbe);
          color: white;
          padding: 18px 15px;
          text-align: left;
          font-family: 'Sora', sans-serif;
          font-weight: 600;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .items-table td {
          padding: 18px 15px;
          border-bottom: 1px solid #e5e7eb;
          font-size: 14px;
        }
        
        .items-table tr:nth-child(even) {
          background: #f9fafb;
        }
        
        .items-table tr:hover {
          background: #f3f4f6;
        }
        
        .product-name {
          font-weight: 600;
          color: #1a1a1a;
          margin-bottom: 4px;
        }
        
        .product-id {
          font-size: 12px;
          color: #6b7280;
          font-family: 'Courier New', monospace;
        }
        
        .quantity {
          text-align: center;
          font-weight: 600;
          color: #183c6c;
        }
        
        .price, .total-price {
          text-align: right;
          font-weight: 600;
          color: #1a1a1a;
        }
        
        .summary-section {
          margin-top: 40px;
          display: flex;
          justify-content: flex-end;
        }
        
        .summary-table {
          width: 350px;
          background: #f8fafc;
          border-radius: 12px;
          padding: 25px;
          border: 1px solid #e5e7eb;
        }
        
        .summary-row {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          font-size: 14px;
        }
        
        .summary-row.subtotal {
          border-bottom: 1px solid #d1d5db;
          margin-bottom: 8px;
          padding-bottom: 12px;
        }
        
        .summary-row.total {
          border-top: 2px solid #183c6c;
          margin-top: 12px;
          padding-top: 15px;
          font-family: 'Sora', sans-serif;
          font-size: 18px;
          font-weight: 700;
          color: #183c6c;
        }
        
        .summary-label {
          color: #4b5563;
        }
        
        .summary-value {
          font-weight: 600;
          color: #1a1a1a;
        }
        
        .footer {
          margin-top: 60px;
          padding-top: 30px;
          border-top: 1px solid #e5e7eb;
          text-align: center;
          color: #6b7280;
          font-size: 12px;
          line-height: 1.8;
        }
        
        .footer-highlight {
          color: #183c6c;
          font-weight: 600;
        }
        
        .thank-you {
          background: linear-gradient(135deg, #183c6c, #4b7bbe);
          color: white;
          padding: 20px;
          border-radius: 12px;
          text-align: center;
          margin: 30px 0;
          font-family: 'Sora', sans-serif;
          font-weight: 600;
        }
        
        @media print {
          body { padding: 20px; }
          .header { page-break-inside: avoid; }
          .items-table { page-break-inside: avoid; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="company-info">
          <div class="company-name">Baladi</div>
          <div class="company-tagline">Premium kvalitetsprodukter</div>
          <div class="company-details">
            Baladi AS<br>
            Postboks 123, 0123 Oslo<br>
            Org.nr: 123 456 789<br>
            E-post: post@baladi.no<br>
            Telefon: +47 12 34 56 78
          </div>
        </div>
        <div class="invoice-info">
          <div class="invoice-title">ORDRE</div>
          <div class="invoice-number">#${order._id.slice(-8).toUpperCase()}</div>
          <div class="invoice-date">${formatDate(new Date(order.createdAt), 'd. MMMM yyyy')}</div>
          <div class="status-badge status-${order.status.toLowerCase()}">${getStatusText(order.status)}</div>
        </div>
      </div>

      <div class="customer-section">
        <div class="customer-info">
          <div class="section-title">Kundedetaljer</div>
          <div class="customer-details">
            <div class="customer-name">${order.userId.name}</div>
            <div>${order.userId.email}</div>
            <div>Kundetype: ${order.userId.userType.toUpperCase()}</div>
          </div>
        </div>
        <div class="shipping-info">
          <div class="section-title">Leveringsadresse</div>
          <div class="customer-details">
            <div class="customer-name">${order.userId.name}</div>
            <div>${order.shippingAddress.addressLine1}</div>
            ${order.shippingAddress.addressLine2 ? `<div>${order.shippingAddress.addressLine2}</div>` : ''}
            <div>${order.shippingAddress.postalCode} ${order.shippingAddress.city}</div>
            <div>${order.shippingAddress.state ? order.shippingAddress.state + ', ' : ''}${order.shippingAddress.country}</div>
          </div>
        </div>
      </div>

      <table class="items-table">
        <thead>
          <tr>
            <th style="width: 50%;">Produkt</th>
            <th style="width: 15%; text-align: center;">Antall</th>
            <th style="width: 17.5%; text-align: right;">Enhetspris</th>
            <th style="width: 17.5%; text-align: right;">Total</th>
          </tr>
        </thead>
        <tbody>
          ${order.items
            .map(
              (item) => `
            <tr>
              <td>
                <div class="product-name">${item.productId.name}</div>
                <div class="product-id">ID: ${item.productId._id.slice(-8).toUpperCase()}</div>
              </td>
              <td class="quantity">${item.quantity}</td>
              <td class="price">${item.price.toLocaleString('no-NO')} kr</td>
              <td class="total-price">${(item.price * item.quantity).toLocaleString('no-NO')} kr</td>
            </tr>
          `,
            )
            .join('')}
        </tbody>
      </table>

      <div class="summary-section">
        <div class="summary-table">
          <div class="summary-row subtotal">
            <span class="summary-label">Subtotal:</span>
            <span class="summary-value">${subtotal.toLocaleString('no-NO')} kr</span>
          </div>
          ${
            shipping > 0
              ? `
            <div class="summary-row">
              <span class="summary-label">Frakt:</span>
              <span class="summary-value">${shipping.toLocaleString('no-NO')} kr</span>
            </div>
          `
              : ''
          }
          ${
            tax > 0
              ? `
            <div class="summary-row">
              <span class="summary-label">MVA (25%):</span>
              <span class="summary-value">${tax.toLocaleString('no-NO')} kr</span>
            </div>
          `
              : ''
          }
          <div class="summary-row total">
            <span class="summary-label">TOTALT:</span>
            <span class="summary-value">${total.toLocaleString('no-NO')} kr</span>
          </div>
        </div>
      </div>

      <div class="thank-you">
        Takk for din bestilling! Vi setter stor pris på ditt valg av Baladi.
      </div>

      <div class="footer">
        <div>Dette dokumentet ble generert automatisk ${formatDate(new Date(), "d. MMMM yyyy 'kl.' HH:mm")}</div>
        <div>For spørsmål om denne ordren, kontakt oss på <span class="footer-highlight">post@baladi.no</span> eller <span class="footer-highlight">+47 12 34 56 78</span></div>
        <div style="margin-top: 15px;">
          <span class="footer-highlight">Baladi AS</span> • Org.nr: 123 456 789 • www.baladi.no
        </div>
      </div>
    </body>
    </html>
  `;
}

function getStatusText(status: OrderStatus): string {
  switch (status) {
    case OrderStatus.PENDING:
      return 'Venter';
    case OrderStatus.CONFIRMED:
      return 'Bekreftet';
    case OrderStatus.SHIPPED:
      return 'Sendt';
    case OrderStatus.DELIVERED:
      return 'Levert';
    case OrderStatus.CANCELLED:
      return 'Kansellert';
    default:
      return 'Ukjent';
  }
}
