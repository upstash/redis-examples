import { BlitzApiRequest, BlitzApiResponse, getSession } from "blitz"

export const handler = async (req: BlitzApiRequest, res: BlitzApiResponse) => {
  const session = await getSession(req, res)
  if (!session.userId) {
    res.status(401).json({ error: `Do not tamper with this route!` })
  } else {
    const url = `${process.env.UPSTASH_REDIS_REST_URL}/lrange/${session.userId}/0/100?_token=${process.env.UPSTASH_REDIS_REST_TOKEN}`

    await fetch(url)
      .then((r) => r.json())
      .then((data) => {
        let result = data.result
        res.status(200).json({ success: true, data: result })
      })
      .catch(() => res.status(500).json({ error: "Error getting data." }))
  }
}
export default handler
