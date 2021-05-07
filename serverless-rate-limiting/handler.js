const RateLimiter = require('async-ratelimiter')
const Redis = require('ioredis')
const { getClientIp } = require('request-ip')

const rateLimiter = new RateLimiter({
    db: new Redis("REPLACE_HERE"),
    max: 1,
    duration: 5_000
})

module.exports.hello = async (event) => {
    const clientIp = getClientIp(event) || 'NA'
    const limit = await rateLimiter.get({id: clientIp})
    if (!limit.remaining) {
        return {
            statusCode: 429,
            body: JSON.stringify(
                {
                    message: 'Sorry, you are rate limited. Wait for 5 seconds',
                    client: clientIp
                },
            ),
        };
    }

    return {
        statusCode: 200,
        body: JSON.stringify(
            {
                message: 'hello!',
                client: clientIp
            },
        ),
    };
};
