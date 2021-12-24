import json
import redis

r = redis.Redis(
  host= 'us1-sharing-dassie-35422.upstash.io',
  port= '35422',
  password= 'f2faf953955f44319b5b131e2108531a',
  charset="utf-8",
  decode_responses=True)

def addScore(event, context):
    info = json.loads(event["body"])
    leaderboard = "Leaderboard"
    score = info["score"]
    player_name = info["firstname"] + "_" + info["lastname"]
    r.zadd(leaderboard, {player_name: score})
    body = {
        "message": "Score added successfully!",
    }

    response = {"statusCode": 200, "body": json.dumps(body)}

    return response
    
def getLeaderboard(event, context):
    leaderboard = "Leaderboard"
    score_list = r.zrange(leaderboard, 0, -1, withscores=True, desc=True)
    body = {
        "message": "Leaderboard returned successfully!",
        "leaderboard": score_list
    }

    response = {"statusCode": 200, "body": json.dumps(body)}

    return response