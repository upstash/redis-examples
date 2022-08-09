import os 
from datetime import datetime

from apscheduler.jobstores.redis import RedisJobStore
from apscheduler.executors.pool import ThreadPoolExecutor, ProcessPoolExecutor
from apscheduler.schedulers.background import BackgroundScheduler

def tick():
    print('Execution time has come: %s' % datetime.now())

if __name__ == '__main__':

    host = os.environ['UPSTASH_REDIS_HOST']
    password = os.environ['UPSTASH_REDIS_PASSWORD']
    port = os.environ['UPSTASH_REDIS_PORT']


    jobstores = {
        'default': RedisJobStore(jobs_key='dispatched_trips_jobs', run_times_key='dispatched_trips_running', host=host, port=port, password=password)
    }
    executors = {
        'default': ThreadPoolExecutor(100),
        'processpool': ProcessPoolExecutor(5)
    }

    scheduler = BackgroundScheduler(jobstores=jobstores, executors=executors)

    scheduler.add_job(tick, 'interval', seconds=3)

    scheduler.start()

    while True:
        pass
