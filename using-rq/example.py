from flask import Flask, request
from redis import Redis, ConnectionPool
from rq import Queue
import os

host = os.environ['UPSTASH_REDIS_HOST']
password = os.environ['UPSTASH_REDIS_PASSWORD']
port = os.environ['UPSTASH_REDIS_PORT']

url = "redis://:{}@{}:{}".format(password, host, port)

print(url)

# pool = ConnectionPool(host=host, port=port, password=password)

r = Redis(host=host, port=port, password=password)
print(r)
queue = Queue(connection=r)


app = Flask(__name__)

def random(input):
    print(input)
    return 'AAAAAAAAAAAAAAAAAAAAAAAaa:' + input

@app.route('/')
def index():
    return 'Hello world!\n'



@app.route('/test', methods=['POST'])
def call_rq():
    # body = request.get_json()
    body = 'asdasd'
    queue.enqueue(random, body)
    return 'test\n'


# Do some sort of data analysis example kind of stuff...

# Your results are ready... Kind of stuff can be made... And then send a request to endpoint for given person, or... idk.   
# Maybe showcase how many tasks are in the queue also

# Web scraper stuff also...

# Process images in multiple different ways... Maybe quantize or apply some filters or play with the size of it... Idk...

# Scale images... depending on the size etc...



# Maybe do some ping checks to see that certain endpoints work as expected...


# Mission critical stuff... Even though the main server crashes, if it successfuly generates the job for the worker, it should still work... Keep the job queue stable and intact...

# Even categorize different type of jobs... Keep track of failed jobs... Makes debugging easier. Especially keeps interactivity in case of a timeout when using 3rd party connections...

# Retry policies... 

# Rate limiting...