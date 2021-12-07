import { auth,get } from '@upstash/redis'

auth(UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN)

addEventListener("fetch", event => {
    event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
    let country = new Map(request.headers).get("cf-ipcountry");
    let greeting = await get(country);
    return greeting.data ? new Response(greeting.data) : new Response("Hello!");
}