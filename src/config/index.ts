import * as dotenv from 'dotenv';

dotenv.config();

if (!process.env.DB_HOST) {
  throw new Error('❌ Missing DB_HOST in .env');
}

export const config = {
  app: {
    port: process.env.PORT ?? 3000,
    baseUrl: process.env.BASE_URL ?? `http://localhost:${process.env.PORT ?? 3000}`,
  },
  db: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    name: process.env.DB_NAME,
  },
  jwt: {
    secret: process.env.JWT_SECRET ?? 'default_secret',
    expiresIn: process.env.JWT_EXPIRES_IN ?? '1h',
  }
};
