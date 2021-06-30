addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  if (request.method === "GET") {
    return getLeaderboard();
  } else if (request.method === "POST") {
    return addScore(request);
  } else {
    return new Response("Invalid Request!")
  }
}

async function getLeaderboard() {
  let url = "https://us1-full-bug-31874.upstash.io/zrevrange/scores/0/1000/WITHSCORES/?_token=" + TOKEN;

  let res = await fetch(new Request(url),
    {
      cf:
        {
          cacheTtl: 10,
          cacheEverything: true,
          cacheKey: url,
        },
    }
  )
  return res;
}

async function addScore(request) {
  const { searchParams } = new URL(request.url)
  let player = searchParams.get('player')
  let score = searchParams.get('score')
  let url = "https://us1-full-bug-31874.upstash.io/zadd/scores/" + score + "/"  + player + "?_token=" + TOKEN;
  let res = await fetch(url)
  return new Response(await res.text())
}
