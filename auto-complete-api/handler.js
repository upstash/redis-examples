'use strict';

var Redis = require("ioredis");
if (typeof client === 'undefined') {
    var client = new Redis(process.env.REDIS_URL);
}
const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
};

module.exports.query = async (event, context, callback) => {
    if (!event.queryStringParameters || !event.queryStringParameters.term) {
        return {
            statusCode: 400,
            headers: headers,
            body: JSON.stringify(
                {
                    message: 'Invalid parameters. Term needed as query param.',
                }
            ),
        };
    }
    let term = event.queryStringParameters.term.toUpperCase();
    let res = []
    let rank = await client.zrank("terms", term)
    if (rank != null) {
        let temp = await client.zrange("terms", rank, rank + 100)
        for (const el of temp) {
            if (!el.startsWith(term)) {
                break;
            }
            if (el.endsWith("*")) {
                res.push(el.substring(0, el.length - 1));
            }
        }
    }
    return {
        statusCode: 200,
        headers: headers,
        body: JSON.stringify(
            {
                message: 'Query:' + event.queryStringParameters.term,
                result: res,
            }
        ),
    };
};

