'use strict';

var Redis = require("redis");


if (typeof client === 'undefined') {
    var client = Redis.createClient ({
        host : 'us1-full-bug-31874.upstash.io',
        port : '31874',
        password: '12345'
    });
}

module.exports.hello = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    // client.on("error", function(err) {
    //     throw err;
    // });
    client.set('foo','bar', function(err, dat) {
        console.log(dat)
        console.log(err)
        callback(null, { response : dat })
    });
};
