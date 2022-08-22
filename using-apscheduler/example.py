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


