addEventListener("fetch", (event) => {
    event.respondWith(
        handleRequest(event.request).catch(
            (err) => new Response(err.stack, { status: 500 })
        )
    );
});

const endpoint = 'https://us1-clever-barnacle-33924.upstash.io'
const token = 'AYSEACQgOTZkMmYwZjMtNzJhOS00ZjY1LThmNDctMTE0OWJhOTA5Y2ViMzBkYmJmZDMzYmQyNDUxYmFkNjk3MjJlYjQ1MWQ5ZDg='

async function recordRequest(request) {
    let d = new Date();
    let datestr = d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate();
    let data = [["url", request.url], ...request.headers]
    let url = endpoint + '/lpush/' + datestr
    const init = {
        body: JSON.stringify(data),
        method: "POST",
        headers: {
            "Authorization": "Bearer " + token
        },
    }
    return await fetch(url, init);
}

async function handleRequest(request) {
    recordRequest(request);
    return new Response("My Awesome Website");
}
