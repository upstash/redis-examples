const bodyParser = require("body-parser")
const app = require("express")()
import Redis from "ioredis"

app.use(bodyParser.json())

app.all("/count", async (req, res) => {
  const redis = new Redis(process.env.REDIS_URL)
  const count = await redis.incr("counter")
  redis.quit()
  res.json({ count })
})

module.exports = app
