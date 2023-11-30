import { Redis } from "@upstash/redis";



export default defineEventHandler(async (event) => {
    const redis = Redis.fromEnv();

    const count = await redis.incr("count");

    return count;

})
