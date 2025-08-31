import { Pool } from 'pg';
import { envConfig } from './env.js';

const dbConnection = new Pool({
  connectionString: envConfig.DATABASE_URL,
});

dbConnection.on('connect', () => {
  console.log(`Connected to database at ${envConfig.DATABASE_URL}`);
});
dbConnection.on('error', err => {
  console.error('Database connection error', err);
});

export default dbConnection;
