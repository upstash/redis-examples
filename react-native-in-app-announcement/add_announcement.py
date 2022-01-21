import json
import redis

r = redis.Redis(
  host= 'us1-sharing-dassie-35422.upstash.io',
  port= '35422',
  password= '',
  charset="utf-8",
  decode_responses=True)


message = "Please update the application before using it."

last_message = r.zrange("Announcements", 0, 0, withscores=True, desc=True)
print("last_message", last_message)
new_version = 0
if len(last_message) > 0:
	new_version = last_message[0][1] + 1
r.zadd("Announcements", {message: new_version})