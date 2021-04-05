'use strict';

var Redis = require("ioredis");

let time = new Date();

if (typeof client === 'undefined') {
    var client = new Redis(process.env.REDIS_URL);
}

module.exports.hello = async(event) => {
    console.log("hello")
    await client.set("hello", "world");
    let response = await client.get("hello");
    return {response : response + "-" + time}
};
