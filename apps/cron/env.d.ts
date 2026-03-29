declare module 'global' {
  global {
    namespace NodeJS {
      interface ProcessEnv {
        MONGO_URI: string;
        SMTP_NAME: string;
        SMTP_MAIL: string;
        SMTP_REPLY_TO: string;
        SMTP_HOST: string;
        SMTP_PORT: string;
        SMTP_USERNAME: string;
        SMTP_PASSWORD: string;
      }
    }
  }
}
