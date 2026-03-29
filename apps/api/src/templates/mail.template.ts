import { OrderResponse } from '@/types/order.types';

const COMPANY_LOGO =
  'https://res.cloudinary.com/dv7ar9aca/image/upload/v1748515719/w700h700_1-removebg-preview_ykrmdu.png';

export function otpVerificationTemplate(name: string, otp: string) {
  return `
<!DOCTYPE html>
<html lang="no">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bekreft din e-postadresse - Baladi</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5; color: #333333;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f5f5f5;">
        <tr>
            <td style="padding: 20px 0;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="margin: 0 auto; background-color: #ffffff; border: 1px solid #e0e0e0;">
                    
                    <!-- Header -->
                    <tr>
                        <td style="background-color: #183c6c; padding: 30px; text-align: center;">
                            <img src="${COMPANY_LOGO}" alt="Baladi" style="max-width: 120px; height: auto; margin-bottom: 15px;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: normal;">E-postbekreftelse</h1>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px 30px;">
                            <h2 style="margin: 0 0 20px 0; color: #183c6c; font-size: 18px; font-weight: normal;">Hei ${name},</h2>
                            
                            <p style="margin: 0 0 30px 0; line-height: 1.6; font-size: 16px; color: #333333;">
                                Takk for at du registrerte deg hos Baladi. For å fullføre registreringen din, vennligst bruk følgende engangskode for å bekrefte e-postadressen din:
                            </p>
                            
                            <!-- OTP Section -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 30px 0;">
                                <tr>
                                    <td style="text-align: center; padding: 20px; background-color: #f8f9fa; border: 2px solid #e9ecef;">
                                        <p style="margin: 0 0 10px 0; font-size: 14px; color: #666666;">Din engangskode:</p>
                                        <div style="background-color: #183c6c; color: #ffffff; padding: 15px 20px; margin: 10px 0; font-size: 28px; font-weight: bold; letter-spacing: 4px; font-family: monospace; border-radius: 4px;">
                                            ${otp}
                                        </div>
                                        <p style="margin: 10px 0 0 0; font-size: 14px; color: #666666;">
                                            Skriv inn denne koden i registreringsskjemaet for å bekrefte kontoen din.
                                        </p>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Important Information -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 30px 0;">
                                <tr>
                                    <td style="padding: 20px; background-color: #fff3cd; border-left: 4px solid #ffc107;">
                                        <h3 style="margin: 0 0 10px 0; color: #856404; font-size: 16px; font-weight: bold;">Viktig informasjon</h3>
                                        <p style="margin: 0; color: #856404; font-size: 14px; line-height: 1.5;">
                                            Denne koden er gyldig i 10 minutter. Hvis du ikke ba om denne bekreftelsen, kan du trygt ignorere denne e-posten.
                                        </p>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Signature -->
                            <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
                                <p style="margin: 0; color: #333333; font-size: 16px;">
                                    Med vennlig hilsen,<br>
                                    <strong style="color: #183c6c;">Baladi Team</strong>
                                </p>
                            </div>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f8f9fa; padding: 20px 30px; text-align: center; border-top: 1px solid #e0e0e0;">
                            <p style="margin: 0 0 5px 0; color: #666666; font-size: 12px;">
                                Dette er en automatisk e-post. Vennligst ikke svar på denne e-posten.
                            </p>
                            <p style="margin: 0; color: #666666; font-size: 12px;">
                                © ${new Date().getFullYear()} Baladi. Alle rettigheter forbeholdt.
                            </p>
                        </td>
                    </tr>
                    
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
  `;
}

export function adminApprovalTemplate(
  name: string,
  email: string,
  userId: string,
  createdAt: string,
) {
  const adminUrl = process.env.ADMIN_URL || '#';
  const verifyUserUrl = `${adminUrl}/dashboard/customers/${userId}`;
  const formattedDate = new Date(createdAt).toLocaleDateString('no-NO', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
  return `
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #0f172a;
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            padding: 20px;
            margin: 0;
          }

          .email-wrapper {
            max-width: 600px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(15, 23, 42, 0.08);
            overflow: hidden;
          }

          .header {
            background: linear-gradient(135deg, #183c6c 0%, #4b7bbe 100%);
            padding: 40px 30px;
            text-align: center;
            color: #ffffff;
          }

          .logo img {
            max-width: 120px;
            height: auto;
            margin-bottom: 20px;
            filter: brightness(0) invert(1);
          }

          .header h1 {
            font-family: 'Sora', sans-serif;
            font-size: 28px;
            font-weight: 600;
            margin: 0;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }

          .content {
            padding: 40px 30px;
          }

          .greeting {
            font-size: 18px;
            font-weight: 600;
            color: #183c6c;
            margin-bottom: 20px;
          }

          .message {
            font-size: 16px;
            color: #475569;
            margin-bottom: 30px;
          }

          .user-details {
            background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
            border-left: 4px solid #183c6c;
            border-radius: 8px;
            padding: 25px;
            margin: 30px 0;
          }

          .user-details h3 {
            font-family: 'Sora', sans-serif;
            color: #183c6c;
            font-size: 18px;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
          }

          .user-details h3::before {
            content: "👤";
            margin-right: 8px;
            font-size: 20px;
          }

          .detail-item {
            display: flex;
            margin-bottom: 12px;
            align-items: center;
          }

          .detail-label {
            font-weight: 600;
            color: #334155;
            min-width: 100px;
            margin-right: 15px;
          }

          .detail-value {
            color: #64748b;
            background: #ffffff;
            padding: 8px 12px;
            border-radius: 6px;
            border: 1px solid #e2e8f0;
            flex: 1;
            font-family: 'Courier New', monospace;
            word-break: break-all;
            overflow-wrap: break-word;
            min-width: 0;
          }

          .action-section {
            text-align: center;
            margin: 40px 0;
            padding: 30px;
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
            border-radius: 12px;
            border: 1px solid #e2e8f0;
          }

          .verify-button {
            display: inline-block;
            background: linear-gradient(135deg, #183c6c 0%, #4b7bbe 100%);
            color: #ffffff !important;
            text-decoration: none;
            padding: 16px 32px;
            border-radius: 8px;
            font-weight: 600;
            font-size: 16px;
            transition: all 0.3s ease;
            box-shadow: 0 4px 12px rgba(24, 60, 108, 0.3);
            border: none;
            cursor: pointer;
          }

          .verify-button:hover {
            background: linear-gradient(135deg, #0f172a 0%, #183c6c 100%);
            box-shadow: 0 6px 20px rgba(24, 60, 108, 0.4);
            transform: translateY(-2px);
          }

          .verify-button::before {
            content: "✓";
            margin-right: 8px;
            font-weight: bold;
          }

          .instruction-text {
            color: #64748b;
            font-size: 14px;
            margin-top: 15px;
            line-height: 1.5;
          }

          .footer {
            background: #f1f5f9;
            padding: 25px 30px;
            text-align: center;
            border-top: 1px solid #e2e8f0;
          }

          .footer p {
            color: #64748b;
            font-size: 13px;
            margin: 5px 0;
          }

          .signature {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e2e8f0;
            color: #475569;
          }

          .signature strong {
            color: #183c6c;
            font-family: 'Sora', sans-serif;
          }

          @media (max-width: 600px) {
            body {
              padding: 10px;
            }

            .email-wrapper {
              margin: 0;
              border-radius: 8px;
              max-width: 100%;
            }

            .header, .content {
              padding: 20px 15px;
            }

            .header h1 {
              font-size: 22px;
              line-height: 1.3;
            }

            .greeting {
              font-size: 16px;
            }

            .message {
              font-size: 14px;
              line-height: 1.5;
            }

            .user-details {
              padding: 15px;
              margin: 20px 0;
            }

            .user-details h3 {
              font-size: 16px;
            }

            .detail-item {
              flex-direction: column;
              align-items: flex-start;
              margin-bottom: 15px;
            }

            .detail-label {
              min-width: auto;
              margin-right: 0;
              margin-bottom: 5px;
              font-size: 13px;
            }

            .detail-value {
              font-size: 12px;
              padding: 6px 8px;
              width: 100%;
            }

            .action-section {
              padding: 15px;
              margin: 25px 0;
            }

            .verify-button {
              padding: 14px 24px;
              font-size: 15px;
              width: 100%;
              max-width: 280px;
            }

            .instruction-text {
              font-size: 13px;
              margin-top: 12px;
            }

            .footer {
              padding: 20px 15px;
            }

            .signature {
              font-size: 14px;
            }
          }

          @media (max-width: 480px) {
            .header h1 {
              font-size: 20px;
            }

            .verify-button {
              font-size: 14px;
              padding: 12px 20px;
            }

            .greeting {
              font-size: 15px;
            }

            .message {
              font-size: 13px;
            }

            .detail-value {
              font-size: 11px;
            }
          }
        </style>
      </head>
      <body>
        <div class="email-wrapper">
          <div class="header">
            <div class="logo">
              <img src="${COMPANY_LOGO}" alt="Baladi Logo">
            </div>
            <h1>Ny Brukerregistrering</h1>
          </div>

          <div class="content">
            <div class="greeting">Hei Administrator,</div>

            <div class="message">
              En ny bruker har registrert seg og bekreftet sin e-postadresse. Vennligst gjennomgå og godkjenn kontoen deres:
            </div>

            <div class="user-details">
              <h3>Brukerdetaljer</h3>
              <div class="detail-item">
                <span class="detail-label">Navn:</span>
                <span class="detail-value">${name}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">E-post:</span>
                <span class="detail-value">${email}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Bruker-ID:</span>
                  <span class="detail-value">${userId}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Registrert:</span>
                  <span class="detail-value">${formattedDate}</span>
                </div>
            </div>

            <div class="action-section">
              <a href="${verifyUserUrl}" class="verify-button">
                Bekreft Bruker
              </a>
              <div class="instruction-text">
                Klikk på knappen ovenfor for å gå direkte til brukerbekreftelsessiden<br>
                og tildele brukertype (intern eller ekstern).
              </div>
            </div>

            <div class="signature">
              <p>Med vennlig hilsen,<br><strong>Baladi System</strong></p>
            </div>
          </div>

          <div class="footer">
            <p>Dette er en automatisk e-post. Vennligst ikke svar på denne e-posten.</p>
            <p>© ${new Date().getFullYear()} Baladi. Alle rettigheter forbeholdt.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export function passwordResetTemplate(name: string, resetLink: string) {
  return `
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #0f172a;
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            padding: 20px;
            margin: 0;
          }

          .email-wrapper {
            max-width: 600px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(15, 23, 42, 0.08);
            overflow: hidden;
          }

          .header {
            background: linear-gradient(135deg, #183c6c 0%, #4b7bbe 100%);
            padding: 40px 30px;
            text-align: center;
            color: #ffffff;
          }

          .logo img {
            max-width: 120px;
            height: auto;
            margin-bottom: 20px;
            filter: brightness(0) invert(1);
          }

          .header h1 {
            font-family: 'Sora', sans-serif;
            font-size: 28px;
            font-weight: 600;
            margin: 0;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }

          .content {
            padding: 40px 30px;
          }

          .greeting {
            font-size: 18px;
            font-weight: 600;
            color: #183c6c;
            margin-bottom: 20px;
          }

          .message {
            font-size: 16px;
            color: #475569;
            margin-bottom: 30px;
          }

          .action-section {
            text-align: center;
            margin: 40px 0;
            padding: 30px;
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
            border-radius: 12px;
            border: 1px solid #e2e8f0;
          }

          .reset-button {
            display: inline-block;
            background: linear-gradient(135deg, #183c6c 0%, #4b7bbe 100%);
            color: #ffffff !important;
            text-decoration: none;
            padding: 16px 32px;
            border-radius: 8px;
            font-weight: 600;
            font-size: 16px;
            transition: all 0.3s ease;
            box-shadow: 0 4px 12px rgba(24, 60, 108, 0.3);
            border: none;
            cursor: pointer;
          }

          .reset-button:hover {
            background: linear-gradient(135deg, #0f172a 0%, #183c6c 100%);
            box-shadow: 0 6px 20px rgba(24, 60, 108, 0.4);
            transform: translateY(-2px);
          }

          .reset-button::before {
            content: "🔒";
            margin-right: 8px;
            font-size: 16px;
          }

          .instruction-text {
            color: #64748b;
            font-size: 14px;
            margin-top: 15px;
            line-height: 1.5;
          }

          .warning-section {
            background: linear-gradient(135deg, #fef3cd 0%, #fde68a 100%);
            border-left: 4px solid #f59e0b;
            border-radius: 8px;
            padding: 20px;
            margin: 30px 0;
          }

          .warning-section h3 {
            color: #92400e;
            font-family: 'Sora', sans-serif;
            font-size: 16px;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
          }

          .warning-section h3::before {
            content: "⚠️";
            margin-right: 8px;
            font-size: 18px;
          }

          .warning-section p {
            color: #92400e;
            font-size: 14px;
            margin: 0;
          }

          .security-section {
            background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
            border-left: 4px solid #3b82f6;
            border-radius: 8px;
            padding: 20px;
            margin: 30px 0;
          }

          .security-section h3 {
            color: #1e40af;
            font-family: 'Sora', sans-serif;
            font-size: 16px;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
          }

          .security-section h3::before {
            content: "🛡️";
            margin-right: 8px;
            font-size: 18px;
          }

          .security-section p {
            color: #1e40af;
            font-size: 14px;
            margin: 0;
          }

          .footer {
            background: #f1f5f9;
            padding: 25px 30px;
            text-align: center;
            border-top: 1px solid #e2e8f0;
          }

          .footer p {
            color: #64748b;
            font-size: 13px;
            margin: 5px 0;
          }

          .signature {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e2e8f0;
            color: #475569;
          }

          .signature strong {
            color: #183c6c;
            font-family: 'Sora', sans-serif;
          }

          @media (max-width: 600px) {
            body {
              padding: 10px;
            }

            .email-wrapper {
              margin: 0;
              border-radius: 8px;
              max-width: 100%;
            }

            .header, .content {
              padding: 20px 15px;
            }

            .header h1 {
              font-size: 22px;
              line-height: 1.3;
            }

            .greeting {
              font-size: 16px;
            }

            .message {
              font-size: 14px;
              line-height: 1.5;
            }

            .action-section {
              padding: 15px;
              margin: 25px 0;
            }

            .reset-button {
              padding: 14px 24px;
              font-size: 15px;
              width: 100%;
              max-width: 280px;
            }

            .instruction-text {
              font-size: 13px;
              margin-top: 12px;
            }

            .warning-section, .security-section {
              padding: 15px;
              margin: 20px 0;
            }

            .warning-section h3, .security-section h3 {
              font-size: 14px;
              flex-wrap: wrap;
            }

            .warning-section p, .security-section ul {
              font-size: 13px;
            }

            .footer {
              padding: 20px 15px;
            }

            .signature {
              font-size: 14px;
            }
          }

          @media (max-width: 480px) {
            .header h1 {
              font-size: 20px;
            }

            .reset-button {
              font-size: 14px;
              padding: 12px 20px;
            }

            .greeting {
              font-size: 15px;
            }

            .message {
              font-size: 13px;
            }

            .warning-section p, .security-section ul {
              font-size: 12px;
            }
          }
        </style>
      </head>
      <body>
        <div class="email-wrapper">
          <div class="header">
            <div class="logo">
              <img src="${COMPANY_LOGO}" alt="Baladi Logo">
            </div>
            <h1>Tilbakestill Passord</h1>
          </div>

          <div class="content">
            <div class="greeting">Hei ${name},</div>

            <div class="message">
              Vi mottok en forespørsel om å tilbakestille passordet ditt. Klikk på knappen nedenfor for å angi et nytt passord:
            </div>

            <div class="action-section">
              <a href="${resetLink}" class="reset-button">
                Tilbakestill Passord
              </a>
              <div class="instruction-text">
                Klikk på knappen ovenfor for å gå til siden for tilbakestilling av passord.<br>
                Du vil bli bedt om å angi et nytt, sikkert passord.
              </div>
            </div>

            <div class="warning-section">
              <h3>Viktig informasjon</h3>
              <p>Denne lenken utløper om 1 time. Hvis du ikke ba om en passordtilbakestilling, kan du trygt ignorere denne e-posten.</p>
            </div>

            <div class="security-section">
              <h3>Sikkerhetstips</h3>
              <p>Velg et sterkt passord som inneholder store og små bokstaver, tall og spesialtegn. Ikke del passordet ditt med andre.</p>
            </div>

            <div class="signature">
              <p>Med vennlig hilsen,<br><strong>Baladi Team</strong></p>
            </div>
          </div>

          <div class="footer">
            <p>Dette er en automatisk e-post. Vennligst ikke svar på denne e-posten.</p>
            <p>© ${new Date().getFullYear()} Baladi. Alle rettigheter forbeholdt.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export function adminCredentialsTemplate(name: string, password: string) {
  const adminUrl = process.env.ADMIN_URL || '#';

  return `
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #0f172a;
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            padding: 20px;
            margin: 0;
          }

          .email-wrapper {
            max-width: 600px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(15, 23, 42, 0.08);
            overflow: hidden;
          }

          .header {
            background: linear-gradient(135deg, #183c6c 0%, #4b7bbe 100%);
            padding: 40px 30px;
            text-align: center;
            color: #ffffff;
          }

          .logo img {
            max-width: 120px;
            height: auto;
            margin-bottom: 20px;
            filter: brightness(0) invert(1);
          }

          .header h1 {
            font-family: 'Sora', sans-serif;
            font-size: 28px;
            font-weight: 600;
            margin: 0;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }

          .content {
            padding: 40px 30px;
          }

          .greeting {
            font-size: 18px;
            font-weight: 600;
            color: #183c6c;
            margin-bottom: 20px;
          }

          .message {
            font-size: 16px;
            color: #475569;
            margin-bottom: 30px;
          }

          .credentials-section {
            background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
            border-left: 4px solid #183c6c;
            border-radius: 8px;
            padding: 25px;
            margin: 30px 0;
            text-align: center;
          }

          .credentials-section h3 {
            font-family: 'Sora', sans-serif;
            color: #183c6c;
            font-size: 18px;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .credentials-section h3::before {
            content: "🔑";
            margin-right: 8px;
            font-size: 20px;
          }

          .password-container {
            background: #ffffff;
            border: 2px solid #183c6c;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
            box-shadow: 0 2px 8px rgba(24, 60, 108, 0.1);
          }

          .password-label {
            font-size: 14px;
            color: #64748b;
            margin-bottom: 10px;
            font-weight: 500;
          }

          .password-value {
            font-family: 'Courier New', monospace;
            font-size: 24px;
            font-weight: bold;
            color: #183c6c;
            background: #f8fafc;
            padding: 15px;
            border-radius: 6px;
            border: 1px solid #e2e8f0;
            letter-spacing: 2px;
            word-break: break-all;
            overflow-wrap: break-word;
            min-width: 0;
            max-width: 100%;
          }

          .warning-section {
            background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
            border-left: 4px solid #ef4444;
            border-radius: 8px;
            padding: 20px;
            margin: 30px 0;
          }

          .warning-section h3 {
            color: #dc2626;
            font-family: 'Sora', sans-serif;
            font-size: 16px;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
          }

          .warning-section h3::before {
            content: "🚨";
            margin-right: 8px;
            font-size: 18px;
          }

          .warning-section p {
            color: #dc2626;
            font-size: 14px;
            margin: 0;
            font-weight: 500;
          }

          .action-section {
            text-align: center;
            margin: 40px 0;
            padding: 30px;
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
            border-radius: 12px;
            border: 1px solid #e2e8f0;
          }

          .login-button {
            display: inline-block;
            background: linear-gradient(135deg, #183c6c 0%, #4b7bbe 100%);
            color: #ffffff !important;
            text-decoration: none;
            padding: 16px 32px;
            border-radius: 8px;
            font-weight: 600;
            font-size: 16px;
            transition: all 0.3s ease;
            box-shadow: 0 4px 12px rgba(24, 60, 108, 0.3);
            border: none;
            cursor: pointer;
          }

          .login-button:hover {
            background: linear-gradient(135deg, #0f172a 0%, #183c6c 100%);
            box-shadow: 0 6px 20px rgba(24, 60, 108, 0.4);
            transform: translateY(-2px);
          }

          .login-button::before {
            content: "🚀";
            margin-right: 8px;
            font-size: 16px;
          }

          .instruction-text {
            color: #64748b;
            font-size: 14px;
            margin-top: 15px;
            line-height: 1.5;
          }

          .security-section {
            background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
            border-left: 4px solid #3b82f6;
            border-radius: 8px;
            padding: 20px;
            margin: 30px 0;
          }

          .security-section h3 {
            color: #1e40af;
            font-family: 'Sora', sans-serif;
            font-size: 16px;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
          }

          .security-section h3::before {
            content: "🛡️";
            margin-right: 8px;
            font-size: 18px;
          }

          .security-section ul {
            color: #1e40af;
            font-size: 14px;
            margin: 10px 0 0 20px;
          }

          .security-section li {
            margin-bottom: 5px;
          }

          .footer {
            background: #f1f5f9;
            padding: 25px 30px;
            text-align: center;
            border-top: 1px solid #e2e8f0;
          }

          .footer p {
            color: #64748b;
            font-size: 13px;
            margin: 5px 0;
          }

          .signature {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e2e8f0;
            color: #475569;
          }

          .signature strong {
            color: #183c6c;
            font-family: 'Sora', sans-serif;
          }

          @media (max-width: 600px) {
            body {
              padding: 10px;
            }

            .email-wrapper {
              margin: 0;
              border-radius: 8px;
              max-width: 100%;
            }

            .header, .content {
              padding: 20px 15px;
            }

            .header h1 {
              font-size: 22px;
              line-height: 1.3;
            }

            .greeting {
              font-size: 16px;
            }

            .message {
              font-size: 14px;
              line-height: 1.5;
            }

            .credentials-section, .action-section {
              padding: 15px;
              margin: 20px 0;
            }

            .credentials-section h3 {
              font-size: 16px;
            }

            .password-container {
              padding: 15px;
              margin: 15px 0;
            }

            .password-label {
              font-size: 12px;
            }

            .password-value {
              font-size: 18px;
              padding: 12px 8px;
              letter-spacing: 1px;
            }

            .login-button {
              padding: 14px 24px;
              font-size: 15px;
              width: 100%;
              max-width: 280px;
            }

            .instruction-text {
              font-size: 13px;
              margin-top: 12px;
            }

            .warning-section, .security-section {
              padding: 15px;
              margin: 20px 0;
            }

            .warning-section h3, .security-section h3 {
              font-size: 14px;
              flex-wrap: wrap;
            }

            .warning-section p, .security-section ul {
              font-size: 13px;
            }

            .footer {
              padding: 20px 15px;
            }

            .signature {
              font-size: 14px;
            }
          }

          @media (max-width: 480px) {
            .header h1 {
              font-size: 20px;
            }

            .password-value {
              font-size: 16px;
              padding: 10px 6px;
              letter-spacing: 0.5px;
            }

            .login-button {
              font-size: 14px;
              padding: 12px 20px;
            }

            .greeting {
              font-size: 15px;
            }

            .message {
              font-size: 13px;
            }

            .warning-section p, .security-section ul {
              font-size: 12px;
            }
          }
        </style>
      </head>
      <body>
        <div class="email-wrapper">
          <div class="header">
            <div class="logo">
              <img src="${COMPANY_LOGO}" alt="Baladi Logo">
            </div>
            <h1>Admin Kontoinformasjon</h1>
          </div>

          <div class="content">
            <div class="greeting">Hei ${name},</div>

            <div class="message">
              Din administrator-konto har blitt opprettet. Her er dine påloggingsopplysninger:
            </div>

            <div class="credentials-section">
              <h3>Dine påloggingsopplysninger</h3>
              <div class="password-container">
                <div class="password-label">Midlertidig passord:</div>
                <div class="password-value">${password}</div>
              </div>
            </div>

            <div class="warning-section">
              <h3>Viktig sikkerhetsinformasjon</h3>
              <p>Vennligst endre dette passordet umiddelbart etter din første pålogging for sikkerhetsformål.</p>
            </div>

            <div class="action-section">
              <a href="${adminUrl}/login" class="login-button">
                Logg Inn Som Admin
              </a>
              <div class="instruction-text">
                Klikk på knappen ovenfor for å gå til admin-panelet<br>
                og logge inn med dine nye legitimasjoner.
              </div>
            </div>

            <div class="security-section">
              <h3>Sikkerhetstips</h3>
              <ul>
                <li>Bruk et sterkt passord med minst 8 tegn</li>
                <li>Inkluder store og små bokstaver, tall og spesialtegn</li>
                <li>Del aldri passordet ditt med andre</li>
                <li>Logg ut når du er ferdig med arbeidet</li>
              </ul>
            </div>

            <div class="signature">
              <p>Med vennlig hilsen,<br><strong>Baladi Team</strong></p>
            </div>
          </div>

          <div class="footer">
            <p>Dette er en automatisk e-post. Vennligst ikke svar på denne e-posten.</p>
            <p>Hvis du ikke ba om en administrator-konto, vennligst kontakt oss umiddelbart.</p>
            <p>© ${new Date().getFullYear()} Baladi. Alle rettigheter forbeholdt.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export function userApprovalTemplate(name: string, email: string) {
  const userUrl = process.env.USER_URL || '#';
  const loginUrl = `${userUrl}/login`;

  return `
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #0f172a;
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            padding: 20px;
            margin: 0;
          }

          .email-wrapper {
            max-width: 600px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(15, 23, 42, 0.08);
            overflow: hidden;
          }

          .header {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            padding: 40px 30px;
            text-align: center;
            color: #ffffff;
          }

          .logo img {
            max-width: 120px;
            height: auto;
            margin-bottom: 20px;
            filter: brightness(0) invert(1);
          }

          .header h1 {
            font-family: 'Sora', sans-serif;
            font-size: 28px;
            font-weight: 600;
            margin: 0;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }

          .success-icon {
            font-size: 48px;
            margin-bottom: 15px;
          }

          .content {
            padding: 40px 30px;
          }

          .greeting {
            font-size: 18px;
            font-weight: 600;
            color: #183c6c;
            margin-bottom: 20px;
          }

          .message {
            font-size: 16px;
            color: #475569;
            margin-bottom: 30px;
          }

          .approval-details {
            background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
            border-left: 4px solid #10b981;
            border-radius: 8px;
            padding: 25px;
            margin: 30px 0;
          }

          .approval-details h3 {
            font-family: 'Sora', sans-serif;
            color: #059669;
            font-size: 18px;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
          }

          .approval-details h3::before {
            content: "✅";
            margin-right: 8px;
            font-size: 20px;
          }

          .detail-item {
            display: flex;
            margin-bottom: 12px;
            align-items: center;
          }

          .detail-label {
            font-weight: 600;
            color: #047857;
            min-width: 120px;
            margin-right: 15px;
          }

          .detail-value {
            color: #065f46;
            background: #ffffff;
            padding: 8px 12px;
            border-radius: 6px;
            border: 1px solid #10b981;
            flex: 1;
            word-break: break-all;
            overflow-wrap: break-word;
            min-width: 0;
          }

          .user-type-badge {
            display: inline-block;
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }

          .user-type-internal {
            background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
            color: #1e40af;
            border: 1px solid #3b82f6;
          }

          .user-type-external {
            background: linear-gradient(135deg, #fef3cd 0%, #fde68a 100%);
            color: #92400e;
            border: 1px solid #f59e0b;
          }

          .action-section {
            text-align: center;
            margin: 40px 0;
            padding: 30px;
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
            border-radius: 12px;
            border: 1px solid #e2e8f0;
          }

          .login-button {
            display: inline-block;
            background: linear-gradient(135deg, #183c6c 0%, #4b7bbe 100%);
            color: #ffffff !important;
            text-decoration: none;
            padding: 16px 32px;
            border-radius: 8px;
            font-weight: 600;
            font-size: 16px;
            transition: all 0.3s ease;
            box-shadow: 0 4px 12px rgba(24, 60, 108, 0.3);
            border: none;
            cursor: pointer;
          }

          .login-button:hover {
            background: linear-gradient(135deg, #0f172a 0%, #183c6c 100%);
            box-shadow: 0 6px 20px rgba(24, 60, 108, 0.4);
            transform: translateY(-2px);
          }

          .login-button::before {
            content: "🚀";
            margin-right: 8px;
            font-size: 16px;
          }

          .instruction-text {
            color: #64748b;
            font-size: 14px;
            margin-top: 15px;
            line-height: 1.5;
          }

          .welcome-section {
            background: linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%);
            border-left: 4px solid #8b5cf6;
            border-radius: 8px;
            padding: 20px;
            margin: 30px 0;
          }

          .welcome-section h3 {
            color: #7c3aed;
            font-family: 'Sora', sans-serif;
            font-size: 16px;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
          }

          .welcome-section h3::before {
            content: "🎉";
            margin-right: 8px;
            font-size: 18px;
          }

          .welcome-section p {
            color: #7c3aed;
            font-size: 14px;
            margin: 0;
          }

          .footer {
            background: #f1f5f9;
            padding: 25px 30px;
            text-align: center;
            border-top: 1px solid #e2e8f0;
          }

          .footer p {
            color: #64748b;
            font-size: 13px;
            margin: 5px 0;
          }

          .signature {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e2e8f0;
            color: #475569;
          }

          .signature strong {
            color: #183c6c;
            font-family: 'Sora', sans-serif;
          }

          @media (max-width: 600px) {
            body {
              padding: 10px;
            }

            .email-wrapper {
              margin: 0;
              border-radius: 8px;
              max-width: 100%;
            }

            .header, .content {
              padding: 20px 15px;
            }

            .header h1 {
              font-size: 22px;
              line-height: 1.3;
            }

            .success-icon {
              font-size: 36px;
            }

            .greeting {
              font-size: 16px;
            }

            .message {
              font-size: 14px;
              line-height: 1.5;
            }

            .approval-details, .action-section {
              padding: 15px;
              margin: 20px 0;
            }

            .approval-details h3 {
              font-size: 16px;
            }

            .detail-item {
              flex-direction: column;
              align-items: flex-start;
              margin-bottom: 15px;
            }

            .detail-label {
              min-width: auto;
              margin-right: 0;
              margin-bottom: 5px;
              font-size: 13px;
            }

            .detail-value {
              font-size: 12px;
              padding: 6px 8px;
              width: 100%;
            }

            .user-type-badge {
              font-size: 11px;
              padding: 4px 8px;
            }

            .login-button {
              padding: 14px 24px;
              font-size: 15px;
              width: 100%;
              max-width: 280px;
            }

            .instruction-text {
              font-size: 13px;
              margin-top: 12px;
            }

            .welcome-section {
              padding: 15px;
              margin: 20px 0;
            }

            .welcome-section h3 {
              font-size: 14px;
              flex-wrap: wrap;
            }

            .welcome-section p {
              font-size: 13px;
            }

            .footer {
              padding: 20px 15px;
            }

            .signature {
              font-size: 14px;
            }
          }

          @media (max-width: 480px) {
            .header h1 {
              font-size: 20px;
            }

            .success-icon {
              font-size: 32px;
            }

            .login-button {
              font-size: 14px;
              padding: 12px 20px;
            }

            .greeting {
              font-size: 15px;
            }

            .message {
              font-size: 13px;
            }

            .detail-value {
              font-size: 11px;
            }

            .user-type-badge {
              font-size: 10px;
              padding: 3px 6px;
            }

            .welcome-section p {
              font-size: 12px;
            }
          }
        </style>
      </head>
      <body>
        <div class="email-wrapper">
          <div class="header">
            <div class="logo">
              <img src="${COMPANY_LOGO}" alt="Baladi Logo">
            </div>
            <div class="success-icon">🎉</div>
            <h1>Konto Godkjent!</h1>
          </div>

          <div class="content">
            <div class="greeting">Gratulerer ${name}!</div>

            <div class="message">
              Din konto hos Baladi har blitt gjennomgått og godkjent av vår administrator. Du kan nå logge inn og begynne å bruke alle våre tjenester.
            </div>

            <div class="approval-details">
              <h3>Kontoopplysninger</h3>
              <div class="detail-item">
                <span class="detail-label">Navn:</span>
                <span class="detail-value">${name}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">E-post:</span>
                <span class="detail-value">${email}</span>
              </div>

            </div>

            <div class="welcome-section">
              <h3>Velkommen til Baladi!</h3>
              <p>Vi er glade for å ha deg som en del av vårt fellesskap. Du har nå full tilgang til alle funksjoner som er tilgjengelige for din brukertype.</p>
            </div>

            <div class="action-section">
              <a href="${loginUrl}" class="login-button">
                Logg Inn Nå
              </a>
              <div class="instruction-text">
                Klikk på knappen ovenfor for å logge inn<br>
                og begynne å utforske alle våre tjenester.
              </div>
            </div>

            <div class="signature">
              <p>Med vennlig hilsen,<br><strong>Baladi Team</strong></p>
            </div>
          </div>

          <div class="footer">
            <p>Dette er en automatisk e-post. Vennligst ikke svar på denne e-posten.</p>
            <p>Hvis du har spørsmål, kan du kontakte oss via våre vanlige kanaler.</p>
            <p>© ${new Date().getFullYear()} Baladi. Alle rettigheter forbeholdt.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export function orderPlacedTemplate(order: OrderResponse) {
  function formatPrice(price: number) {
    return new Intl.NumberFormat('no-NO', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  }

  return `
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #0f172a;
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            padding: 20px;
            margin: 0;
          }

          .email-wrapper {
            max-width: 700px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(15, 23, 42, 0.08);
            overflow: hidden;
          }

          .header {
            background: #183c6c;
            padding: 40px 30px;
            text-align: center;
            color: #ffffff;
          }

          .logo img {
            max-width: 120px;
            height: auto;
            margin-bottom: 20px;
            filter: brightness(0) invert(1);
          }

          .header h1 {
            font-family: 'Sora', sans-serif;
            font-size: 28px;
            font-weight: 600;
            margin: 0;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }

          .order-number {
            background: rgba(255, 255, 255, 0.2);
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 600;
            margin-top: 15px;
            display: inline-block;
          }

          .content {
            padding: 40px 30px;
          }

          .greeting {
            font-size: 18px;
            font-weight: 600;
            color: #183c6c;
            margin-bottom: 20px;
          }

          .message {
            font-size: 16px;
            color: #475569;
            margin-bottom: 30px;
          }



          .order-total {
            background: linear-gradient(135deg, #183c6c 0%, #4b7bbe 100%);
            color: #ffffff;
            padding: 25px;
            border-radius: 8px;
            text-align: center;
            margin: 30px 0;
          }

          .order-total h3 {
            font-family: 'Sora', sans-serif;
            font-size: 18px;
            margin-bottom: 10px;
          }

          .total-amount {
            font-size: 32px;
            font-weight: 700;
            font-family: 'Sora', sans-serif;
          }



          .footer {
            background: #f1f5f9;
            padding: 25px 30px;
            text-align: center;
            border-top: 1px solid #e2e8f0;
          }

          .footer p {
            color: #64748b;
            font-size: 13px;
            margin: 5px 0;
          }

          .signature {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e2e8f0;
            color: #475569;
          }

          .signature strong {
            color: #183c6c;
            font-family: 'Sora', sans-serif;
          }

          .order-details-section {
            text-align: center;
            margin: 30px 0;
            padding: 25px;
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
            border-radius: 8px;
            border: 1px solid #e2e8f0;
          }

          .order-details-button {
            display: inline-block;
            background: linear-gradient(135deg, #183c6c 0%, #4b7bbe 100%);
            color: #ffffff !important;
            text-decoration: none;
            padding: 14px 28px;
            border-radius: 8px;
            font-weight: 600;
            font-size: 16px;
            transition: all 0.3s ease;
            box-shadow: 0 4px 12px rgba(24, 60, 108, 0.3);
            border: none;
            cursor: pointer;
          }

          .order-details-button:hover {
            background: linear-gradient(135deg, #0f172a 0%, #183c6c 100%);
            box-shadow: 0 6px 20px rgba(24, 60, 108, 0.4);
            transform: translateY(-2px);
          }

          .order-details-button::before {
            content: "📄";
            margin-right: 8px;
            font-size: 16px;
          }

          @media (max-width: 600px) {
            body {
              padding: 10px;
            }

            .email-wrapper {
              margin: 0;
              border-radius: 8px;
              max-width: 100%;
            }

            .header, .content {
              padding: 20px 15px;
            }

            .header h1 {
              font-size: 22px;
              line-height: 1.3;
            }

            .total-amount {
              font-size: 24px;
            }

            .order-details-section {
              padding: 20px 15px;
              margin: 20px 0;
            }

            .order-details-button {
              padding: 12px 24px;
              font-size: 15px;
              width: 100%;
              max-width: 280px;
            }
          }
        </style>
      </head>
      <body>
        <div class="email-wrapper">
          <div class="header">
            <div class="logo">
              <img src="${COMPANY_LOGO}" alt="Baladi Logo">
            </div>
            <h1 style="color: #ffffff;">Bestilling Bekreftet</h1>
            <div class="order-number">Ordre #${order._id.toString().slice(-8).toUpperCase()}</div>
          </div>

          <div class="content">
            <div class="greeting">Hei ${order.userId.name},</div>

            <div class="message">
              Din bestilling har blitt mottatt og bekreftet! Vi takker for din ordre og jobber nå med å behandle den så raskt som mulig.
            </div>

            <div class="order-total">
              <h3>Totalt å betale</h3>
              <div class="total-amount">${formatPrice(order.totalAmount)} kr</div>
              <div style="font-size: 14px; margin-top: 5px; opacity: 0.9;">Inkludert mva</div>
            </div>

            <div class="order-details-section">
              <a href="${process.env.USER_URL || '#'}/order/${order._id}" class="order-details-button">
                Se Bestillingsdetaljer
              </a>
              <div style="color: #64748b; font-size: 14px; margin-top: 15px; line-height: 1.5;">
                Klikk på knappen ovenfor for å se fullstendige bestillingsdetaljer<br>
                og spore statusen til din ordre.
              </div>
            </div>

            <div class="signature">
              <p>Med vennlig hilsen,<br><strong>Baladi Engros</strong></p>
            </div>
          </div>

          <div class="footer">
            <p>Dette er en automatisk e-post. Vennligst ikke svar på denne e-posten.</p>
            <p>Hvis du har spørsmål om din bestilling, kan du kontakte oss via våre vanlige kanaler.</p>
            <p>© ${new Date().getFullYear()} Baladi. Alle rettigheter forbeholdt.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export function contactUsTemplate(
  name: string,
  email: string,
  phone: string,
  company: string,
  subject: string,
  message: string,
  submittedAt: string,
) {
  const formattedDate = new Date(submittedAt).toLocaleDateString('no-NO', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return `
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #0f172a;
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            padding: 20px;
            margin: 0;
          }

          .email-wrapper {
            max-width: 600px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(15, 23, 42, 0.08);
            overflow: hidden;
          }

          .header {
            background: linear-gradient(135deg, #183c6c 0%, #4b7bbe 100%);
            padding: 40px 30px;
            text-align: center;
            color: #ffffff;
          }

          .logo img {
            max-width: 120px;
            height: auto;
            margin-bottom: 20px;
            filter: brightness(0) invert(1);
          }

          .notification-icon {
            font-size: 48px;
            margin-bottom: 15px;
            display: block;
          }

          .header h1 {
            font-family: 'Sora', sans-serif;
            font-size: 28px;
            font-weight: 600;
            margin: 0;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }

          .content {
            padding: 40px 30px;
          }

          .greeting {
            font-size: 18px;
            font-weight: 600;
            color: #183c6c;
            margin-bottom: 20px;
          }

          .message {
            font-size: 16px;
            color: #475569;
            margin-bottom: 30px;
            line-height: 1.6;
          }

          .contact-details {
            background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
            border-left: 4px solid #ff9f45;
            border-radius: 8px;
            padding: 25px;
            margin: 30px 0;
          }

          .contact-details h3 {
            font-family: 'Sora', sans-serif;
            color: #183c6c;
            font-size: 18px;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
          }

          .contact-details h3::before {
            content: "📞";
            margin-right: 8px;
            font-size: 20px;
          }

          .detail-item {
            display: flex;
            margin-bottom: 12px;
            align-items: flex-start;
          }

          .detail-label {
            font-weight: 600;
            color: #334155;
            min-width: 120px;
            margin-right: 15px;
            margin-top: 8px;
          }

          .detail-value {
            color: #64748b;
            background: #ffffff;
            padding: 8px 12px;
            border-radius: 6px;
            border: 1px solid #e2e8f0;
            flex: 1;
            word-break: break-word;
            overflow-wrap: break-word;
            min-width: 0;
          }

          .detail-value.email {
            font-family: 'Courier New', monospace;
          }

          .detail-value.phone {
            font-family: 'Courier New', monospace;
          }

          .message-section {
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
            border-left: 4px solid #183c6c;
            border-radius: 8px;
            padding: 25px;
            margin: 30px 0;
          }

          .message-section h3 {
            font-family: 'Sora', sans-serif;
            color: #183c6c;
            font-size: 18px;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
          }

          .message-section h3::before {
            content: "💬";
            margin-right: 8px;
            font-size: 20px;
          }

          .message-content {
            background: #ffffff;
            padding: 20px;
            border-radius: 8px;
            border: 1px solid #e2e8f0;
            color: #475569;
            line-height: 1.6;
            white-space: pre-wrap;
            word-wrap: break-word;
          }

          .urgency-section {
            text-align: center;
            margin: 40px 0;
            padding: 25px;
            background: linear-gradient(135deg, #fef3cd 0%, #fde68a 100%);
            border-radius: 12px;
            border: 1px solid #f59e0b;
          }

          .urgency-section h3 {
            color: #92400e;
            font-family: 'Sora', sans-serif;
            font-size: 16px;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .urgency-section h3::before {
            content: "⚡";
            margin-right: 8px;
            font-size: 18px;
          }

          .urgency-section p {
            color: #92400e;
            font-size: 14px;
            margin: 0;
          }

          .timestamp-section {
            background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
            border-radius: 8px;
            padding: 20px;
            margin: 25px 0;
            text-align: center;
          }

          .timestamp-section h4 {
            color: #475569;
            font-family: 'Sora', sans-serif;
            font-size: 14px;
            margin-bottom: 8px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }

          .timestamp {
            color: #183c6c;
            font-weight: 600;
            font-size: 16px;
          }

          .footer {
            background: #f1f5f9;
            padding: 25px 30px;
            text-align: center;
            border-top: 1px solid #e2e8f0;
          }

          .footer p {
            color: #64748b;
            font-size: 13px;
            margin: 5px 0;
          }

          .signature {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e2e8f0;
            color: #475569;
          }

          .signature strong {
            color: #183c6c;
            font-family: 'Sora', sans-serif;
          }

          @media (max-width: 600px) {
            body {
              padding: 10px;
            }

            .email-wrapper {
              margin: 0;
              border-radius: 8px;
              max-width: 100%;
            }

            .header, .content {
              padding: 20px 15px;
            }

            .header h1 {
              font-size: 22px;
              line-height: 1.3;
            }

            .notification-icon {
              font-size: 36px;
            }

            .greeting {
              font-size: 16px;
            }

            .message {
              font-size: 14px;
              line-height: 1.5;
            }

            .contact-details, .message-section, .urgency-section {
              padding: 15px;
              margin: 20px 0;
            }

            .contact-details h3, .message-section h3 {
              font-size: 16px;
            }

            .detail-item {
              flex-direction: column;
              align-items: flex-start;
              margin-bottom: 15px;
            }

            .detail-label {
              min-width: auto;
              margin-right: 0;
              margin-bottom: 5px;
              margin-top: 0;
              font-size: 13px;
            }

            .detail-value {
              font-size: 14px;
              padding: 10px 12px;
              width: 100%;
            }

            .message-content {
              padding: 15px;
              font-size: 14px;
            }

            .timestamp-section {
              padding: 15px;
            }

            .footer {
              padding: 20px 15px;
            }

            .signature {
              font-size: 14px;
            }
          }

          @media (max-width: 480px) {
            .header h1 {
              font-size: 20px;
            }

            .notification-icon {
              font-size: 32px;
            }

            .greeting {
              font-size: 15px;
            }

            .message {
              font-size: 13px;
            }

            .detail-value {
              font-size: 13px;
              padding: 8px 10px;
            }

            .message-content {
              font-size: 13px;
              padding: 12px;
            }
          }
        </style>
      </head>
      <body>
        <div class="email-wrapper">
          <div class="header">
            <div class="logo">
              <img src="${COMPANY_LOGO}" alt="Baladi Logo">
            </div>
            <div class="notification-icon">📩</div>
            <h1>Ny Kontakthenvendelse</h1>
          </div>

          <div class="content">
            <div class="greeting">Hei Administrator!</div>

            <div class="message">
              Du har mottatt en ny kontakthenvendelse via kontaktskjemaet på Baladi Engros nettsiden.
              Her er detaljene for henvendelsen som krever din oppmerksomhet.
            </div>

            <div class="contact-details">
              <h3>Kontaktopplysninger</h3>
              <div class="detail-item">
                <span class="detail-label">Navn:</span>
                <span class="detail-value">${name}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">E-post:</span>
                <span class="detail-value email">${email}</span>
              </div>
              ${
                phone
                  ? `
              <div class="detail-item">
                <span class="detail-label">Telefon:</span>
                <span class="detail-value phone">${phone}</span>
              </div>
              `
                  : ''
              }
              ${
                company
                  ? `
              <div class="detail-item">
                <span class="detail-label">Bedrift:</span>
                <span class="detail-value">${company}</span>
              </div>
              `
                  : ''
              }
              <div class="detail-item">
                <span class="detail-label">Emne:</span>
                <span class="detail-value">${subject}</span>
              </div>
            </div>

            <div class="message-section">
              <h3>Melding fra kunde</h3>
              <div class="message-content">${message}</div>
            </div>

            <div class="timestamp-section">
              <h4>Henvendelse mottatt</h4>
              <div class="timestamp">${formattedDate}</div>
            </div>

            <div class="urgency-section">
              <h3>Påminnelse</h3>
              <p>Vennligst svar på denne henvendelsen så snart som mulig for å opprettholde god kundeservice.</p>
            </div>

            <div class="signature">
              <p>Dette er en automatisk varsling fra<br><strong>Baladi Engros Kontaktskjema</strong></p>
            </div>
          </div>

          <div class="footer">
            <p>Dette er en automatisk e-post som varsler om ny kontakthenvendelse.</p>
            <p>For å svare kunden, vennligst bruk e-postadressen oppgitt i kontaktopplysningene ovenfor.</p>
            <p>© ${new Date().getFullYear()} Baladi Engros. Alle rettigheter forbeholdt.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}
