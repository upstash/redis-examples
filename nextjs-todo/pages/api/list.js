export default async (req, res) => {
    const token = "REPLACE_YOUR_TOKEN";
    const url = "https://REPLACE_YOUR_ENDPOINT/lrange/todo/0/100?_token=" + token;

    return fetch(url)
        .then(r => r.json())
        .then(data => {
            let result = JSON.stringify(data.result)
            return res.status(200).json(result)
        })
}
