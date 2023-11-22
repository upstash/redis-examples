import { Injectable } from '@nestjs/common';
import { nanoid } from 'nanoid';
import { createRedisClient } from './lib/redis-client';
import { ConfigService } from '@nestjs/config';
import { Redis } from '@upstash/redis';

export const UUID_LENGTH = 5;
const EIGHT_HOUR_IN_SEC = 3600 * 8;
export const EIGHT_HOUR_IN_MS = EIGHT_HOUR_IN_SEC * 1000;

export type ShortLinkCacheValues = {
  createadAt: number; //Date.now()
  expiredAt: number; //Date.now()
  actualLink: string;
  k: string;
};

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  getRedis(): Redis {
    const restUrl = this.configService.get<string>('UPSTASH_REDIS_REST_URL');
    const restToken = this.configService.get<string>(
      'UPSTASH_REDIS_REST_TOKEN',
    );
    return createRedisClient(restUrl, restToken);
  }

  getHello(): string {
    return 'Hello World!';
  }

  async setShortUrlToCache(
    linkToShorten: string,
    expirationTime = EIGHT_HOUR_IN_SEC,
    userId: string,
  ) {
    const pathKey = `${nanoid(UUID_LENGTH)}:${userId}`;

    const payload: ShortLinkCacheValues = {
      createadAt: Date.now(),
      expiredAt: Date.now() + EIGHT_HOUR_IN_MS,
      actualLink: linkToShorten,
      k: pathKey,
    };
    const res = await this.getRedis().set<ShortLinkCacheValues>(
      pathKey,
      payload,
      {
        ex: expirationTime,
      },
    );
    if (res) {
      return pathKey;
    }
  }

  async getShortUrlFromCache(pathKey: string) {
    const res = await this.getRedis().get<ShortLinkCacheValues>(pathKey);
    return res;
  }

  async getAllShortUrlsFromCacheForUser(userId: string) {
    const keys = await this.getRedis().keys(`*${userId}*`);
    if (Boolean(keys.length)) {
      const listOfUrls = await this.getRedis().mget<ShortLinkCacheValues[]>(
        ...keys,
      );
      return listOfUrls;
    }
  }
}
