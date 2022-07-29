import redis, { databaseName } from "$lib/redis";
import type { RequestHandler } from "@sveltejs/kit";

const redirect = {
  status: 303,
  headers: {
    location: "/",
  },
};

export const get: RequestHandler = async () => {
  let todos = [];

  const data = await redis.hgetall(databaseName);
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

  await redis.hset(databaseName, id, todo);
  return redirect;
};

export const patch: RequestHandler = async ({ request }) => {
  const form = await request.formData();
  const todo = form.get("todo");

  const { id, text, status } = JSON.parse(todo as string);
  let newTodo = { text, status: !status };

  await redis.hset(databaseName, id, JSON.stringify(newTodo));
  return redirect;
};

export const del: RequestHandler = async ({ request, locals }) => {
  const form = await request.formData();
  const id = form.get("id");

  await redis.hdel(databaseName, id as string);
  return redirect;
};
