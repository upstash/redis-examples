
addEventListener("fetch", event => {
    event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
    let country = new Map(request.headers).get("cf-ipcountry");
    let url = `https://usw1-selected-termite-30690.upstash.io/get/${country}?_token=AnfiASQgNWQzYmYzMDYtZTJkOS00YWQxLTlhZDAtZmUyOTc5ZGVlOTNlrtzXPqVS39LBiT81oCue0Bal1BuC2CnlMhOJX9Odts4=`;
    let res = await fetch(url);
    let restext = await res.text();
    let greeting = await JSON.parse(restext);
    return greeting.result ? new Response(greeting.result) : new Response("Hello!");
}