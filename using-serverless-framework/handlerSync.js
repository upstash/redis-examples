'use strict';

var Redis = require("ioredis");


if (typeof client === 'undefined') {
    var client = new Redis("redis://:6f9ae50f60db42d587ada7174f2f64d0@eu1-apt-bedbug-32176.upstashdev.com:32176");
}

module.exports.hello = (event, context, callback) => {
    // This will allow us to freeze open connections to a database
    context.callbackWaitsForEmptyEventLoop = false;

    client.get("foo").then( (dat, err) => {
        callback(null, { response : dat })
    } )
};
