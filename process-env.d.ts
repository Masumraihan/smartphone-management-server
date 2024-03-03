declare namespace NodeJS {
  export type ProcessEnv = {
    NODE_ENV: string;
    PORT: number;
    DB_URL: string;
    ENCRYPT_SECRET: string;
    ACCESS_TOKEN_SECRET: string;
    ACCESS_TOKEN_EXPIRES_IN: string;
    REFRESH_TOKEN_SECRET: string;
    REFRESH_TOKEN_EXPIRES_IN: string;
  };
}
