import { Redis } from "@upstash/redis/cloudflare";

export default Redis.fromEnv();
