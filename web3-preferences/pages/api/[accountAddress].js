import { Redis } from "@upstash/redis"
const redis = Redis.fromEnv()

export default async function handler(req, res) {

    const accountID = req.query.accountAddress
    console.log("accountID:", accountID)

    const getResult = await redis.get(accountID)

    res.status(200).json({ result: getResult })
}
