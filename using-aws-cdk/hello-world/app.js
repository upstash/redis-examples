let response;
var Redis = require("ioredis");

if (typeof client === 'undefined') {
    var client = new Redis("rediss://:ec0651dac90948de97cf09a57a74fd62@usw1-selected-termite-30690.upstash.io:30690");
}

exports.lambdaHandler = async (event, _context) => {
  try {
        await client.set("message", event?.queryStringParameters?.greet ?? "World!");
        let res = await client.get("message");
        response = {
            'statusCode': 200,
            'body': JSON.stringify({
                message: 'Hello ' + res,
            })
        }
    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};