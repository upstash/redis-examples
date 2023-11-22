import { Controller, Get, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private configService: ConfigService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/shorten')
  shorterUrl(@Req() req: Request) {
    const queries = req.query;
    const { linkToShorten, userId } = queries as unknown as {
      linkToShorten: string;
      expire: number;
      userId: string;
    };
    return this.appService.setShortUrlToCache(linkToShorten, null, userId);
  }

  @Get('/get-shortened-url/:id')
  getShortenedUrl(@Req() req: Request) {
    return this.appService.getShortUrlFromCache(req.params['id']);
  }

  @Get('/get-all-shortened-url/:id')
  getAllShortenedUrl(@Req() req: Request) {
    return this.appService.getAllShortUrlsFromCacheForUser(req.params['id']);
  }
}
