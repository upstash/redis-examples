import { Redis } from "@upstash/redis";

const submitHandler = async (req, res) => {
  const body = req.body;

  console.log({ body });

  // Prepare data to be insert into DB
  const data = {
    rating: String(body.rating) || "0",
    recommendation: String(body.recommendation) || "false",
    comment: String(body.comment) || "",
  };

  // generate a random id
  const id =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);

  // Insert data into Upstash redis

  const redis = new Redis({
    token: "INSERT_YOUR_TOKEN",
    url: "INSERT_YOUR_URL",
  });

  try {
    //Store the survey data
    await redis.hset(
      `entries:${id}`, data
    );

    //Store the id of the survey to retrieve it later
    await redis.sadd("entries", `entries:${id}`);
  } catch (error) {
    console.error("Failed to insert data into redis", error);

    return res.status(500).json({
      success: false,
      message: "Failed to insert data into redis",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Data inserted successfully",
  });
};

export default submitHandler;
