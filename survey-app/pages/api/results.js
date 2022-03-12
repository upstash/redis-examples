import { Redis } from "@upstash/redis";

const resultsHandler = async (req, res) => {
  // Retrieve data from redis

  const redis = new Redis({
    token: "INSERT_YOUR_TOKEN",
    url: "INSERT_YOUR_URL",
  });

  try {
    //Find all the entries in the set
    const entries = await redis.smembers("entries");
    //Get all survey entries by id/key
    //To run multiple queries at once, Upstash supports the use of the pipeline command. This way we can run multiple queries at once and get the results in a single call.
    const p = redis.pipeline();
    entries.forEach((id) => {
      p.hgetall(id);
    });
    const results = await p.exec();

    return res.status(200).json({
      success: true,
      message: "Data retrieved successfully",
      data: results,
    });
  } catch (error) {
    console.error("Failed to retrieve data from redis", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve data from redis",
    });
  }
};

export default resultsHandler;
