const Redis = require("ioredis");
require('dotenv').config()
console.log("EDGE analytics with CloudFlare Workers and Upstash Redis.")
let redis = new Redis(process.env.REDIS_URL);
let dateArg = process.argv[2]
let datestr;
if (dateArg) {
    datestr = dateArg;
} else {
    let d = new Date();
    datestr = d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate();
}

redis.lrange(datestr, "0", "-1", function (err, result) {
    let pageview = 0;
    let users = new Set();
    let countries = new Map();
    let paths = new Map();
    if (err) {
        console.log("Could not connect to Redis.")
        console.error(err);
    } else {
        console.log("Upstash Redis Connection Successful. Analyzing the access logs...")
        if (!result || result.length === 0) {
            console.log("Could not find any access logs for the date:" + datestr);
        } else {
            for (const elem of result) {
                let entries = JSON.parse(elem)
                for (let entry of entries) {
                    if (entry[0] === "accept") {
                        if (entry[1].startsWith("text"))
                            pageview++;
                    }
                    if (entry[0] === "cf-ipcountry") {
                        let temp = countries.get(entry[1]);
                        if (!temp) {
                            temp = 0
                        }
                        countries.set(entry[1], temp + 1);
                    }
                    if (entry[0] === "url") {
                        let temp = paths.get(entry[1]);
                        if (!temp) {
                            temp = 0
                        }
                        paths.set(entry[1], temp + 1);
                    }
                    if (entry[0] === "x-real-ip") {
                        users.add(entry[1]);
                    }

                }
            }
            countries = new Map([...countries.entries()].sort((a, b) =>
                b[1] - a[1]
            ));
            paths = new Map([...paths.entries()].sort((a, b) =>
                b[1] - a[1]
            ));
            console.log("\nDATE: " + datestr)
            console.log("\nPAGE VIEWS: " + pageview)
            console.log("\nUNIQUE VISITORS: " + users.size)
            logMap("TOP COUNTRIES", countries);
            logMap("TOP PAGES", paths);
        }
    }
});

function logMap(title, data) {
    console.log("\n" + title);
    console.log("----------------");
    console.log(mapEntriesToString(data))
}

function mapEntriesToString(entries) {
    return Array
        .from(entries, ([k, v]) => `${k} : ${v}\n`)
        .join("");
}