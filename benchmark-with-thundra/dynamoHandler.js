'use strict';
var AWS = require("aws-sdk");

const https = require('https');
const agent = new https.Agent({
    keepAlive: true,
    maxSockets: Infinity
});

AWS.config.update({
    region: "us-west-1",
    httpOptions: {
        agent
    }
});

const thundra = require("@thundra/core")(
    {apiKey: process.env.THUNDRA_KEY});

var params = {
    TableName: "news",
    IndexName: "section-view_count-index",
    KeyConditionExpression: "#sect = :section",
    ExpressionAttributeNames: {
        "#sect": "section"
    },
    ExpressionAttributeValues: {
        ":section": process.env.SECTION
    },
    Limit: 10,
    ScanIndexForward: false,
};
const docClient = new AWS.DynamoDB.DocumentClient();

module.exports.load = thundra((event, context, callback) => {
    docClient.query(params, (err, result) => {
        if (err) {
            console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            let response = {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true,
                },
                body: JSON.stringify(
                    {
                        data: result
                    }
                )
            };
            callback(null, response)
        }
    });
});
