import "dotenv/config";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

const DATABASE_KEY = process.env.DATABASE_KEY || "redis-with-remix";

export function fetchData() {
  return new Promise(async (resolve, reject) => {
    const res = await redis.hgetall<Record<string, object>>(DATABASE_KEY);
    const todos = Object.entries(res ?? {}).map(([key, value]) => ({
      id: key,
      ...value,
    }));
    // sort by date (id=timestamp)
    todos.sort((a, b) => parseInt(b.id) - parseInt(a.id));

    // sort by date (id=timestamp)
    resolve(todos.sort((a, b) => parseInt(b.id) - parseInt(a.id)));
  });
}

export function insertOrUpdateData(id: string, task: object) {
  return new Promise(async (resolve, reject) => {
    const data = await redis.hset(DATABASE_KEY, { [id]: task });

    resolve(data);
  });
}
