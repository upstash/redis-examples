
import type { NextRequest } from 'next/server';

import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: 'REPLACE',
  token: 'REPLACE',
})

export default async(req: NextRequest) => {
  let loc = req.geo?.country || "World"
  const count = await redis.incr(loc);
  return new Response(`Location: ${loc}  View count: ${count}` );
};


export const config = {
  runtime: 'experimental-edge',
};