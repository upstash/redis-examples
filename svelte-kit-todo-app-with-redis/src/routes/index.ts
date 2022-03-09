import "dotenv/config";
import { Redis } from "@upstash/redis";
import type { RequestHandler } from "@sveltejs/kit";

const DATABASE_NAME = "redis-with-svelte-kit";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const redirect = {
  status: 303,
  headers: {
    location: "/",
  },
};

export const get: RequestHandler = async () => {
  let todos = [];

  const data = await redis.hgetall(DATABASE_NAME);
  if (!data) return { body: { todos } };

  todos = Object.keys(data)
    .map((key) => ({
      id: key,
      text: data[key]["text"],
      status: data[key]["status"],
    }))
    .sort((a, b) => parseInt(b.id) - parseInt(a.id));

  return { body: { todos } };
};

export const post: RequestHandler = async ({ request }) => {
  const form = await request.formData();
  const text = form.get("text");
  const id = Date.now().toString();

  const todo = JSON.stringify({ text, status: false });

  await redis.hset(DATABASE_NAME, id, todo);
  return {};
};

export const patch: RequestHandler = async ({ request }) => {
  const form = await request.formData();
  const todo = form.get("todo");

  const { id, text, status } = JSON.parse(todo as string);
  let newTodo = { text, status: !status };

  await redis.hset(DATABASE_NAME, id, JSON.stringify(newTodo));
  return redirect;
};

export const del: RequestHandler = async ({ request, locals }) => {
  const form = await request.formData();
  const id = form.get("id");

  await redis.hdel(DATABASE_NAME, id as string);
  return redirect;
};
