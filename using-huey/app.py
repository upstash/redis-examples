import os

from flask import Flask

from huey import RedisHuey

host = os.environ['UPSTASH_REDIS_HOST']
password = os.environ['UPSTASH_REDIS_PASSWORD']
port = os.environ['UPSTASH_REDIS_PORT']

url = "redis://:{}@{}:{}".format(password, host, port)
huey = RedisHuey('parallel-processing', host=host, port=port, password=password,)

app = Flask(__name__)