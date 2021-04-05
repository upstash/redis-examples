'use strict';

var Redis = require("ioredis");

module.exports.hello = async(event) => {
    var client = new Redis(process.env.REDIS_URL);
    await client.set("hello", "world");
    let response = await client.get("hello");
    await client.quit();
    return {response : response}
};
