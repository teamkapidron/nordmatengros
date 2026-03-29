/// <reference path="../.sst/platform/config.d.ts" />

export const bucket = new sst.aws.Bucket('nordmatengros', {
  cors: {
    allowOrigins: [
      'http://localhost:3000',
      'http://localhost:3001',
      'https://nordmatengros.com',
      'https://www.nordmatengros.com',
      'https://admin.nordmatengros.com',
      'https://www.admin.nordmatengros.com',
    ],
    allowMethods: ['DELETE', 'GET', 'HEAD', 'POST', 'PUT'],
    allowHeaders: ['*'],
  },
});
