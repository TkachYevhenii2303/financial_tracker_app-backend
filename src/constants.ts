import 'dotenv/config';

export const constants = {
    // Server
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',

    // Client
    CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:3000',

    // Database
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_PORT: process.env.DB_PORT || '5432',
    DB_USERNAME: process.env.DB_USERNAME || 'postgres',
    DB_PASSWORD: process.env.DB_PASSWORD || 'password',
    DB_NAME: process.env.DB_NAME || 'financial_tracker',

    // JWT
    JWT_SECRET: process.env.JWT_SECRET || 'secret',
    JWT_EXPIRATION_TIME: process.env.JWT_EXPIRATION_TIME || '1h',
    JWT_REFRESH_TOKEN_SECRET: process.env.JWT_REFRESH_TOKEN_SECRET || 'refresh_secret',
    JWT_REFRESH_TOKEN_EXPIRATION_TIME: process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME || '7d',
};
