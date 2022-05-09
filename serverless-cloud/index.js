const { schedule } = require("@serverless/cloud");

schedule.every("60 minutes", async () => {
  console.log("Hello from Serverless Cloud");
});
