// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';

let response;
var Redis = require("ioredis");

if (typeof client === 'undefined') {
    var client = new Redis("rediss://:ec0651dac90948de97cf09a57a74fd62@usw1-selected-termite-30690.upstash.io:30690");
}

exports.lambdaHandler = async (event, context) => {
    try {
        console.log("hello")
        await client.set("hello", "world");
        let res = await client.get("hello");
        response = {
            'statusCode': 200,
            'body': JSON.stringify({
                message: 'hello ' + res,
                // location: ret.data.trim()
            })
        }
    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};
