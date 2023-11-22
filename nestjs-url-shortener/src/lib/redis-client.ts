import { Redis } from '@upstash/redis';

export const createRedisClient = (restUrl: string, restToken: string) => {
  const redis = new Redis({
    url: restUrl,
    token: restToken,
  });
  return redis;
};
