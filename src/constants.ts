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
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || 'secret',
    JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN || '1h',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'refresh_secret',
    JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
};
