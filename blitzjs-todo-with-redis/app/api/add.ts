//blitzjs api route
import { BlitzApiRequest, BlitzApiResponse, getSession } from "blitz"

const handler = async (req: BlitzApiRequest, res: BlitzApiResponse) => {
  const session = await getSession(req, res)
  if (req.method !== "POST" || !req.body.data || !session.userId) {
    res.status(401).json({ error: `Do not tamper with this route!` })
  } else {
    let todo = encodeURI(req.body.data)
    const url = `${process.env.UPSTASH_REDIS_REST_URL}/lpush/${session.userId}/${todo}?_token=${process.env.UPSTASH_REDIS_REST_TOKEN}`
    await fetch(url)
      .then(() => res.status(200).json({ success: true }))
      .catch(() => res.status(500).json({ error: "Error adding data." }))
  }
}
export default handler
