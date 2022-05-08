import redis from '../../lib/redis'


export default async function handler(req, res) {

    const accountID = req.query.fetch[1]
    console.log("accountID:", accountID)

    const getResult = await redis.get(accountID);

    // console.log("getResult:", getResult)

    res.status(200).json({ result: getResult })
}
