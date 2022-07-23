// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: 'REPLACE_HERE',
  token: 'REPLACE_HERE',
})

export default async function handler(req, res) {
  const data = await redis.get('users');
  res.status(200).json({ users: data });
}
