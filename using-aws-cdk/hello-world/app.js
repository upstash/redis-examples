let response;
var Redis = require("ioredis");

if (typeof client === 'undefined') {
    var client = new Redis("YOUR_REDIS_URL");
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