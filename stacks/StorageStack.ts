/// <reference path="../.sst/platform/config.d.ts" />

export const bucket = new sst.aws.Bucket('baladi', {
  cors: {
    allowOrigins: [
      'http://localhost:3000',
      'http://localhost:3001',
      'https://baladiengros.no',
      'https://www.baladiengros.no',
      'https://admin.baladiengros.no',
      'https://www.admin.baladiengros.no',
    ],
    allowMethods: ['DELETE', 'GET', 'HEAD', 'POST', 'PUT'],
    allowHeaders: ['*'],
  },
});
