declare namespace NodeJS {
  interface ProcessEnv {
    DB_HOST: string;
    DB_PORT: string;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    DB_NAME: string;
    R2_ACCESS_KEY_ID: string;
    R2_ACCOUNT_ID: string;
    R2_BUCKET_NAME: string;
    R2_PUBLIC_URL?: string;
    R2_SECRET_ACCESS_KEY: string;
    STATIC_DIR: string;
  }
}
