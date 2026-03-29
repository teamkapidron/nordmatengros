/// <reference path="../.sst/platform/config.d.ts" />
/// <reference path="../apps/cron/env.d.ts" />

export const cron = new sst.aws.Cron('InventoryAlertCron', {
  schedule: 'cron(0 22 * * ? *)',
  function: {
    timeout: '5 minutes',
    runtime: 'nodejs20.x',
    handler: 'apps/cron/src/handlers/inventoryAlert.handler',
    environment: {
      MONGO_URI: process.env.MONGO_URI,
      SMTP_NAME: process.env.SMTP_NAME,
      SMTP_MAIL: process.env.SMTP_MAIL,
      SMTP_REPLY_TO: process.env.SMTP_REPLY_TO,
      SMTP_HOST: process.env.SMTP_HOST,
      SMTP_PORT: process.env.SMTP_PORT,
      SMTP_USERNAME: process.env.SMTP_USERNAME,
      SMTP_PASSWORD: process.env.SMTP_PASSWORD,
    },
  },
});
