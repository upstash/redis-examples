const hdr = require("hdr-histogram-js");
const Redis = require("ioredis");
if (typeof client === 'undefined') {
    var client = new Redis(fixUrl(process.env.REDIS_URL));
}
const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
};
const SIZE = 10000;

module.exports.get = async (event) => {
    if (!event.queryStringParameters || !event.queryStringParameters.name) {
        return {
            statusCode: 400,
            headers: headers,
            body: JSON.stringify(
                {
                    message: 'Invalid parameters. Name is needed.',
                }
            ),
        };
    }
    const name = event.queryStringParameters.name;
    const data = await client.lrange(name, 0, SIZE);
    const histogram = hdr.build();
    data.forEach(item => {
        histogram.recordValue(item);
    })

    return {
        statusCode: 200,
        body: JSON.stringify(
            {
                histogram: histogram
            }
        ),
    };
};

module.exports.record = async (event) => {
    let body = JSON.parse(event.body)
    if (!body || !body.name || !body.values) {
        return {
            statusCode: 400,
            headers: headers,
            body: JSON.stringify(
                {
                    message: 'Invalid parameters. Name and values are needed.',
                }
            ),
        };
    }
    const name = body.name;
    const values = body.values;
    await client.lpush(name, values)
    return {
        statusCode: 200,
        body: JSON.stringify(
            {
                message: 'Success',
                name: name
            }
        ),
    };
};


function fixUrl(url) {
    if (!url) {
        return ''
    }
    if (url.startsWith('redis://') && !url.startsWith('redis://:')) {
        return url.replace('redis://', 'redis://:')
    }
    if (url.startsWith('rediss://') && !url.startsWith('rediss://:')) {
        return url.replace('rediss://', 'rediss://:')
    }
    return url
}