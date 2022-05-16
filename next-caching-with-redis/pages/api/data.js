import Redis from "ioredis";

let redis = new Redis(process.env.REDIS_URL);

export default async (req, res) => {
  let start = Date.now();
  let cache = await redis.get("cache");
  cache = JSON.parse(cache);

  let result = {};

  if (cache) {
    console.log("loading from cache");
    result.data = cache;
    result.type = "redis";
    result.latency = Date.now() - start;

    return res.status(200).json(result);
  } else {
    console.log("loading from api");
    start = Date.now();

    return fetch("https://coronavirus-19-api.herokuapp.com/countries")
      .then((r) => r.json())
      .then((data) => {
        data.sort(function (a, b) {
          return b.todayCases - a.todayCases;
        });
        result.data = data.splice(1, 11);
        result.type = "api";
        result.latency = Date.now() - start;
        redis.set("cache", JSON.stringify(result.data), "EX", 60);
        return res.status(200).json(result);
      });
  }
};
