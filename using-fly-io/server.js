const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const {Redis} = require('@upstash/redis');

const redis = new Redis({
    url: 'REPLACE_HERE',
    token: 'REPLACE_HERE',
})

app.get(["/", "/:name"], async (req, res) => {
    let greeting = "<h1>Hello From Node on Fly!</h1>";
    if (req.url !== "/favicon.ico") {
        const data = await redis.incr('count');
        res.send(greeting + "</br> Counter: " + data);
    }   else {
        res.send("");
    }
});

app.listen(port, () => console.log(`HelloNode app listening on port ${port}!`))

