import redis, { databaseName } from "lib/redis";

export default async function handler(req, res) {
  const method = req.method;
  const { text } = req.body;

  switch (method) {
    // get all todos
    case "GET":
      let todos = [];
      const data = await redis.hgetall(databaseName);
      if (!data) {
        return res.status(200).json(todos);
      }

      todos = Object.keys(data)
        .map((key) => ({ id: key, ...data[key] }))
        .sort((a, b) => parseInt(b.id) - parseInt(a.id));

      return res.status(200).json(todos);

    // create a new todo
    case "POST":
      const newId = Date.now().toString();
      const todo = JSON.stringify({ text, status: false });
      await redis.hset(databaseName, { [newId]: todo });
      return res.status(201).json({ message: "Created" });

    default:
      res.status(405).json({ message: "Method Not Allowed" });
  }
}
