import type { NextFetchEvent, NextRequest } from 'next/server'
import upstash from '@upstash/redis';


export async function middleware(req: NextRequest, ev: NextFetchEvent) {
    const country = req.geo.country || 'US';
    const redis = upstash('UPSTASH_REDIS_REST_URL', 'UPSTASH_REDIS_REST_TOKEN');
    let result = await redis.get(country);
    let greeting = result.data || 'Hello World!'
    return new Response(greeting)
}