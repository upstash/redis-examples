import "dotenv/config";
import upstash from "@upstash/redis";

const redis = upstash(
  process.env.UPSTASH_REDIS_REST_URL,
  process.env.UPSTASH_REDIS_REST_TOKEN
);

const DATABASE_KEY = process.env.DATABASE_KEY || "redis-with-remix";

export function fetchData() {
  return new Promise(async (resolve, reject) => {
    const { data, error } = await redis.hgetall(DATABASE_KEY);

    if (error) reject(error);

    let todos = [];
    for (let i = 0; i < data.length; i++) {
      const keyValue = JSON.parse(data[i + 1]);
      todos.push({ id: data[i], ...keyValue });
      i++;
    }

    // sort by date (id=timestamp)
    resolve(todos.sort((a, b) => parseInt(b.id) - parseInt(a.id)));
  });
}

export function insertOrUpdateData(id: string, task: object) {
  return new Promise(async (resolve, reject) => {
    const { data, error } = await redis.hset(
      DATABASE_KEY,
      id,
      JSON.stringify(task)
    );

    if (error) reject(error);

    resolve(data);
  });
}
