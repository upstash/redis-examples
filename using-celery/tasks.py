
from concurrent.futures import process
import os
import time
from celery import Celery
import requests

host = os.environ['UPSTASH_REDIS_HOST']
password = os.environ['UPSTASH_REDIS_PASSWORD']
port = os.environ['UPSTASH_REDIS_PORT']
connection_link = "redis://:{}@{}:{}".format(password, host, port)


# Results will expire from database after 16 hours. 
# You can remove `result_expires` option so that your results will be persisted and can be fetched whenever.
celery_app = Celery('tasks', backend=connection_link, broker=connection_link, result_expires=60 * 60 * 16)


@celery_app.task
def process_task(process_string, id, email):

    start = time.time()
    print(f'Started on process {process_string} of user with id: {id}.')

    # maybe add ratelimiting... use 
    job_difficulty_matrix = {
        'easy': 1,
        'medium': 3,
        'hard': 5,
        'extreme': 7
    }

    time_for_process = job_difficulty_matrix.get(process_string, -1)
    resultDict = {}

    if time_for_process != -1:
        # Emulate long running job with sleep.
        time.sleep(time_for_process)
        resultDict = {'process_string': process_string, 'id': id ,'email':email, 'result': 'Successfull', 'billable_time': time.time() - start}
    else:
        resultDict = {'process_string': process_string, 'id': id ,'email':email, 'result': 'Failure', 'billable_time': time.time() - start}

    requests.post('http://localhost:5000/notify', json=resultDict)
    return resultDict
