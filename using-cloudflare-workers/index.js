import { Redis } from '@upstash/redis/cloudflare'

const redis = Redis.fromEnv()

addEventListener("fetch", event => {
    event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
    const country = new Map(request.headers).get("cf-ipcountry");
    const greeting = await redis.get(country);
    return greeting ? new Response(greeting) : new Response("Hello!");
}