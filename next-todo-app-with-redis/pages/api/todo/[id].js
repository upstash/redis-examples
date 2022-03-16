import redis, { databaseName } from "lib/redis";

export default async function handler(req, res) {
  const method = req.method;
  const { id } = req.query;
  const { text, status } = req.body;

  switch (method) {
    // update a todo
    case "PUT":
      const todo = JSON.stringify({ text, status });
      await redis.hset(databaseName, { [id]: todo });
      return res.status(200).json({ message: "Updated" });

    // delete a todo
    case "DELETE":
      await redis.hdel(databaseName, id);
      return res.status(200).json({ message: "Deleted" });

    default:
      res.status(405).json({ message: "Method Not Allowed" });
  }
}
