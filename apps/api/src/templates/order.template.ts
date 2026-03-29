import { OrderResponse } from '@/types/order.types';

export function pickingListTemplate(order: OrderResponse) {
  const totalWeight = order.items.reduce(
    (total, item) => total + item.productId.weight * item.quantity,
    0,
  );
  const totalVolume = order.items.reduce(
    (total, item) =>
      total +
      item.productId.dimensions.length *
        item.productId.dimensions.width *
        item.productId.dimensions.height,
    0,
  );

  const palletPreference = order.palletType;
  const customerNotes = order.notes;

  return `<!DOCTYPE html>
<html lang="no">
<head>
  <meta charset="UTF-8" />
  <title>Plukkeliste</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 40px;
      background-color: #f4f4f4;
      color: #333;
    }

    .sheet {
      background: white;
      padding: 30px;
      max-width: 800px;
      margin: auto;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    }

    h1 {
      margin-bottom: 5px;
    }

    .top-info {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
    }

    .summary {
      font-weight: bold;
      margin-bottom: 20px;
    }

    .details-box {
      background-color: #f8f8f8;
      padding: 15px;
      border: 1px solid #ddd;
      margin: 20px 0;
      border-radius: 4px;
    }

    .details-box p {
      margin: 5px 0;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 10px;
    }

    th, td {
      border: 1px solid #ccc;
      padding: 12px;
      text-align: left;
    }

    th {
      background-color: #eee;
    }

    .order-header {
      background-color: #f8f8f8;
      font-weight: bold;
      padding: 10px;
      border: 1px solid #ddd;
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      min-height: 24px;
    }

    .order-header span {
      font-weight: normal;
      font-size: 14px;
      color: #555;
      text-align: right;
      line-height: 1.3;
    }

    .checkbox {
      text-align: center;
    }

    .dashed-row td {
      border-style: dashed;
    }
  </style>
</head>
<body>

  <div class="sheet">
    <div class="top-info">
      <div>
        <h1>Plukkeliste</h1>
        <div><strong>Baladi Engros</strong></div>
      </div>
      <div style="text-align: right;">
        <strong>Dato:</strong> ${new Date().toLocaleDateString()}
      </div>
    </div>

    <div class="summary">
      Totalt antall varer: ${order.items.length} &nbsp;&nbsp;&nbsp; Total antall kolli: ${order.items.reduce((total, item) => total + item.quantity, 0)}
    </div>

    <div class="details-box">
      <p><strong>Total vekt:</strong> ${totalWeight.toFixed(2)} kg</p>
      <p><strong>Total volum:</strong> ${totalVolume.toFixed(2)} m³</p>
      ${palletPreference ? `<p><strong>Palletype:</strong> ${palletPreference}</p>` : ''}
      ${customerNotes ? `<p><strong>Kundenotater:</strong> ${customerNotes}</p>` : ''}
    </div>

    <div class="order-header">
      Ordre #${order._id.toString()} <span>Navn: ${order.userId.companyName}</span>
    </div>

    <table>
      <thead>
        <tr>
          <th>Produktnavn</th>
          <th>Antall</th>
          <th>SKU</th>
          <th>Strekkode</th>
          <th>Plukket</th>
          <th>Ikke plukket</th>
        </tr>
      </thead>
      <tbody>
        ${order.items.map(
          (item) => `
          <tr class="dashed-row">
            <td>${item.productId.name ?? 'N/A'}</td>
            <td>${item.quantity ?? 'N/A'}</td>
            <td>${item.productId.sku ?? 'N/A'}</td>
            <td>${item.productId.barcode ?? 'N/A'}</td>
            <td class="checkbox">☐</td>
            <td class="checkbox">☐</td>
          </tr>
        `,
        )}
      </tbody>
    </table>
  </div>

</body>
</html>
`;
}

export function freightLabelTemplate(order: OrderResponse) {
  const totalWeight = order.items.reduce(
    (total, item) => total + item.productId.weight * item.quantity,
    0,
  );
  const totalVolume = order.items.reduce(
    (total, item) =>
      total +
      item.productId.dimensions.length *
        item.productId.dimensions.width *
        item.productId.dimensions.height,
    0,
  );

  const palletPreference = order.palletType;

  return `<!DOCTYPE html>
<html lang="no">
<head>
  <meta charset="UTF-8" />
  <style>
    html, body {
      margin: 0;
      padding: 0;
      height: 100%;
      width: 100%;
    }

    body {
      font-family: Arial, sans-serif;
      background-color: #fff;
      color: #000;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .label {
      padding: 30px;
      width: 100%;
      max-width: 800px;
      box-sizing: border-box;
    }

    .section {
      margin-bottom: 25px;
    }

    .section h2 {
      margin: 0 0 10px;
      font-size: 28px;
      border-bottom: 1px solid #000;
      padding-bottom: 5px;
    }

    .section div {
      margin-bottom: 6px;
      font-size: 25px;
      line-height: 1.4;
    }

    .barcode-box {
      margin-top: 30px;
      text-align: center;
    }

    .barcode-box .barcode {
      font-size: 24px;
      letter-spacing: 4px;
    }

    .footer {
      text-align: right;
      font-size: 12px;
      color: #555;
      margin-top: 20px;
    }

    .signature-section {
      margin-top: 40px;
      border-top: 1px solid #000;
      padding-top: 20px;
    }

    .signature-box {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
    }

    .signature-field {
      width: 45%;
    }

    .signature-line {
      border-top: 1px solid #000;
      margin-top: 50px;
      padding-top: 5px;
    }
  </style>
</head>
<body>

  <div class="label">
    <div class="section">
      <h2>Frakt Fra</h2>
      <div><strong>Baladi Engros</strong></div>
      <div>Andersrudveien 1</div>
      <div>1914 Ytre Enebakk</div>
      <div>Norge</div>
    </div>

    <div class="section">
      <h2>Frakt Til</h2>
      <div><strong>${order.userId.name}</strong></div>
      <div>${order.shippingAddress.addressLine1 ?? ''}</div>
      <div>${order.shippingAddress.addressLine2 ?? ''}</div>
      <div>
        ${order.shippingAddress.city ?? ''} ${order.shippingAddress.state ?? ''}
        ${order.shippingAddress.postalCode ?? ''}
      </div>
      <div>${order.shippingAddress.country ?? ''}</div>
    </div>

    <div class="section">
      <h2>Ordre Informasjon</h2>
      <div><strong>Total Vekt:</strong> ${totalWeight.toFixed(2)} kg</div>
      <div><strong>Total Volum:</strong> ${totalVolume.toFixed(2)} m³</div>
      ${palletPreference ? `<div><strong>Palletype:</strong> ${palletPreference}</div>` : ''}
    </div>

    <div class="barcode-box">
      <div class="barcode">${order._id.toString().toUpperCase()}</div>
    </div>

    <div class="signature-section">
      <h2>Leveringsbekreftelse</h2>
      <div class="signature-box">
        <div class="signature-field">
          <div>Signatur</div>
          <div class="signature-line"></div>
        </div>
      </div>
    </div>

    <div class="footer">
      Skrevet ut ${new Date().toLocaleString()}
    </div>
  </div>

</body>
</html>
`;
}
