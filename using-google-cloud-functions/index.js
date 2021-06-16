/**
 * HTTP Cloud Function.
 * This function is exported by index.js, and is executed when
 * you make an HTTP request to the deployed function's endpoint.
 *
 * @param {Object} req Cloud Function request context.
 *                     More info: https://expressjs.com/en/api.html#req
 * @param {Object} res Cloud Function response context.
 *                     More info: https://expressjs.com/en/api.html#res
 */
var Redis = require("ioredis");

if (typeof client === 'undefined') {
    var client = new Redis("REPLACE_YOUR_UPSTASH_REDIS_URL");
}

exports.helloGET = async(req, res) => {
    let count = await client.incr("counter");
    res.send('Page view:' + count);
};