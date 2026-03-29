declare module 'global' {
  global {
    namespace NodeJS {
      interface ProcessEnv {
        MONGO_URI: string;
        JWT_SECRET: string;
        JWT_EXPIRY: string;
        COOKIE_EXPIRY: string;
        COOKIE_DOMAIN: string;
        SMTP_NAME: string;
        SMTP_MAIL: string;
        SMTP_REPLY_TO: string;
        SMTP_HOST: string;
        SMTP_PORT: string;
        SMTP_USERNAME: string;
        SMTP_PASSWORD: string;
        ADMIN_API_KEY: string;
        WAREHOUSE_EMAIL: string;
        AWS_ACCESS_KEY: string;
        AWS_ACCESS_SECRET: string;
        ADMIN_URL: string;
        USER_URL: string;
        CONTACT_EMAIL: string;
        API_URL: string;
      }
    }
  }
}
