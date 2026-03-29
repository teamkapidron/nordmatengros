/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      home: 'aws',
      name: 'baladi',
      protect: ['production'].includes(input?.stage),
      removal: input?.stage === 'production' ? 'retain' : 'remove',
      providers: {
        aws: {
          region: 'eu-central-1',
        },
      },
    };
  },
  async run() {
    await import('./stacks/CronStack');
    await import('./stacks/StorageStack');
  },
});
