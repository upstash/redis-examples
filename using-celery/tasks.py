import os
from celery import Celery

host = os.environ['UPSTASH_REDIS_HOST']
password = os.environ['UPSTASH_REDIS_PASSWORD']
port = os.environ['UPSTASH_REDIS_PORT']
connection_link = "redis://:{}@{}:{}".format(password, host, port)

app = Celery('tasks', backend=connection_link, broker=connection_link)



@app.task
def add(x, y):
    return x + y


# To start this session:
# celery -A <filename> worker --loglevel=INFO

# from another python instance
# >>> from tasks import add
# >>> result = add.delay(4, 4)

# >>> result.ready()
# True
# >>> result.get()
# 8