declare module 'global' {
  global {
    namespace NodeJS {
      interface ProcessEnv {
        NEXT_PUBLIC_API_URL: string;
        NEXT_PUBLIC_USER_URL: string;
        NEXT_PUBLIC_ADMIN_URL: string;
      }
    }
  }
}
