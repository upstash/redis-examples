const { Redis } = require('@upstash/redis');
const NetlifyGraph = require("../../lib/netlifyGraph");


exports.handler = async (req, res) => {
    // By default, all API calls use no authentication
    // let accessToken = null;

    //// If you want to use the client's accessToken when making API calls on the user's behalf:
    // accessToken = req.headers["authorization"]?.split(" ")[1];

    //// If you want to use the API with your own access token:
    accessToken = process.env.ONEGRAPH_AUTHLIFY_TOKEN;

    const eventBodyJson = req.body || {};

    const redis = new Redis({
        url: "UPSTASH_REDIS_REST_URL",
        token: "UPSTASH_REDIS_REST_TOKEN",
    })
    spotifyData = await redis.get('spotify-cache');
    if (spotifyData == null) {
        spotifyData = await NetlifyGraph.fetchSpotifyFeatured({}, { accessToken: accessToken });
        if (spotifyData.errors) {
            console.error(JSON.stringify(spotifyData.errors, null, 2));
        } else {
            await redis.setex('spotify-cache', 300, spotifyData);
        }
    } else {
        spotifyData = JSON.parse(spotifyData.data)
    }
    res.setHeader("Content-Type", "application/json");

    return res.status(200).json({
        spotifyData
    });
};

exports.default = exports.handler;

/**
 * Client-side invocations:
 * Call your Netlify function from the browser with this helper:
 */

/**
 async function fetchSpotifyFeatured(netlifyGraphAuth, params) {
  const {} = params || {};
  const resp = await fetch(`/api/SpotifyFeatured`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    ...netlifyGraphAuth?.authHeaders()
    },
    body: JSON.stringify({})
  });

  const text = await resp.text();

  return JSON.parse(text);
}
 */
