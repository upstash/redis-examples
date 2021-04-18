import Redis from "ioredis"

export default async function (req, res) {
  const redis = new Redis(process.env.REDIS_URL)
  const count = await redis.incr("counter")
  redis.quit()

  res.setHeader("Content-Type", "application/json")
  res.write(JSON.stringify({ count }))
  res.end()
}
