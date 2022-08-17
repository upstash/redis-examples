
from concurrent.futures import process
import os
import time
from celery import Celery

host = os.environ['UPSTASH_REDIS_HOST']
password = os.environ['UPSTASH_REDIS_PASSWORD']
port = os.environ['UPSTASH_REDIS_PORT']
connection_link = "redis://:{}@{}:{}".format(password, host, port)
# connection_link = "redis://:{}@{}:1234".format(password, host)


print(connection_link)
celery_app = Celery('tasks', broker=connection_link)
# celery_app = Celery('tasks', backend=connection_link, broker=connection_link)


@celery_app.task
def add(x, y):
    time.sleep(5)
    return x + y

@celery_app.task
def process_task(process_string, id, email):

    print(f'Started on process {process_string} of user with id: {id}.')

    # maybe add ratelimiting... use 
    job_difficulty_matrix = {
        'easy': 1,
        'medium': 3,
        'hard': 5,
        'extreme': 7
    }

    time_for_process = job_difficulty_matrix.get(process_string, -1)
    if time_for_process != -1:
        time.sleep(time_for_process)
        print(f"Process is finished after {time_for_process} seconds")
        return f"Sending reports to {email} for user:{id}."
        # Maybe generate some report here...
    else:
        print('Operation parameters are not valid.')
        return f"Sending the failing notification to {email} for user:{id}."

        # Give some notification error... Generate exception maybe, idk...
    


# To start this session:
# celery -A <filename> worker --loglevel=INFO

# from another python instance
# >>> from tasks import add
# >>> result = add.delay(4, 4)

# >>> result.ready()
# True
# >>> result.get()
# 8




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