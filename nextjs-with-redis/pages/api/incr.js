import Redis from 'ioredis'

export default async (req, res) => {
  let redis = new Redis(process.env.REDIS_URL)
  const count = await redis.incr('counter')
  redis.quit()

  res.status(200).json({ count })
}
