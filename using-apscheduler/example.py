import os
from datetime import datetime

from apscheduler.jobstores.redis import RedisJobStore
from apscheduler.executors.pool import ThreadPoolExecutor, ProcessPoolExecutor
from apscheduler.schedulers.background import BackgroundScheduler

counter = 0

def tick():
    print('Execution time has come: %s' % datetime.now())
    global counter
    counter += 1
    print('counter:', counter)

if __name__ == '__main__':

    host = os.environ['UPSTASH_REDIS_HOST']
    password = os.environ['UPSTASH_REDIS_PASSWORD']
    port = os.environ['UPSTASH_REDIS_PORT']

    jobstores = {
        'default': RedisJobStore(jobs_key='jobs', run_times_key='running', host=host, port=port, password=password)
        # 'default': RedisJobStore(jobs_key='jobs', run_times_key='running', host='localhost', port=6379)

    }
    executors = {
        'default': ThreadPoolExecutor(100),
        'processpool': ProcessPoolExecutor(5)
    }

    scheduler = BackgroundScheduler(jobstores=jobstores, executors=executors)
    # scheduler = BackgroundScheduler(job_defaults={'misfire_grace_time': 2}, jobstores=jobstores, executors=executors)

    # job = scheduler.add_job(tick, 'interval', seconds=5, id='test-function')

    scheduler.start()

    # while True:
    #     # time.sleep(1000)
    #     pass

    counter = 1
    while True and counter < 10:
        pass


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