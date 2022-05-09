import { Redis } from "@upstash/redis"
const redis = Redis.fromEnv()

export default async function handler(req, res) {

  const accountID = await JSON.parse(req.body).accountID
  const body = req.body

  const setResult = await redis.set(accountID, body);
  res.status(200).json({ result: setResult })
}
