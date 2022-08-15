const Redis = require('ioredis')

host = process.env.UPSTASH_REDIS_HOST
password = process.env.UPSTASH_REDIS_PASSWORD
port = process.env.UPSTASH_REDIS_PORT

const redis = new Redis({
    host: host,
    port: port,
    username: "default",
    password: password,
});

(async () => {
    const set = await redis.set('foo', 'bar')

    redis.get('foo').then(resp => {
        console.log('resp:', resp)
    })
})();



