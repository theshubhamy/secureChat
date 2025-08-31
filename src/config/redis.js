import { createClient } from 'redis';

import { envConfig } from './env.js';

const redisClient = createClient({
  url: envConfig.REDIS_URL,
});

redisClient.on('connect', () => {
  console.log(`Connected to Redis at ${envConfig.REDIS_URL}`);
});
redisClient.on('error', err => console.error('Redis Client Error', err));

export default redisClient;
