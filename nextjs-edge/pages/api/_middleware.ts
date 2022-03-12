import type { NextFetchEvent, NextRequest } from "next/server";
import { Redis } from "@upstash/redis";

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  const redis = new Redis({
    url: "UPSTASH_REDIS_REST_URL",
    token: "UPSTASH_REDIS_REST_TOKEN",
  });
  const country = req.geo.country || "US";
  const result = await redis.get<string>(country);
  const greeting = result || "Hello World!";
  return new Response(greeting);
}
