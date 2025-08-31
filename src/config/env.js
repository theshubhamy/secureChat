import dotenv from 'dotenv';

dotenv.config();

export const envConfig = {
  NODE_ENV: process.env.NODE_ENV || 'DEV',
  API_PORT: process.env.API_PORT || 8080,
  SIGNAL_PORT: process.env.SIGNAL_PORT || 8090,
  DATABASE_URL: process.env.DATABASE_URL || '',
  REDIS_URL: process.env.REDIS_URL || '',
  JWT_SECRET: process.env.JWT_SECRET || '',
  OTP_ISSUER: process.env.OTP_ISSUER || '',
  TURN_SECRET: process.env.TURN_SECRET || '',
  TURN_URIS: process.env.TURN_URIS || '',
};
