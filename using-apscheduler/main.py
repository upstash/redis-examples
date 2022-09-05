import os
import sys
from datetime import datetime
import random

from apscheduler.jobstores.redis import RedisJobStore
from apscheduler.executors.pool import ThreadPoolExecutor, ProcessPoolExecutor
from apscheduler.schedulers.background import BackgroundScheduler

host = os.environ['UPSTASH_REDIS_HOST']
password = os.environ['UPSTASH_REDIS_PASSWORD']
port = os.environ['UPSTASH_REDIS_PORT']

jobstores = {
    'default': RedisJobStore(jobs_key='jobs', run_times_key='running', host=host, port=port, password=password)
}
executors = {
    'default': ThreadPoolExecutor(100),
    'processpool': ProcessPoolExecutor(5)
}

scheduler = BackgroundScheduler(jobstores=jobstores, executors=executors)

def check_and_notify(coin, threshold):
    current_value = check_price(coin)
    print(f'current val for {coin}: {current_value}')

    if current_value > threshold:
        notify(f'webhook_{coin}', f'{coin} mesage')
    
    return current_value


def notify(webhook, message):
    # Send message, email or any kind of notifier.
    print(f'Sending {message} to webhook: {webhook}')
    return webhook + ": " + message


def check_price(coin):
    # Here, ideally call another API endpoint to get values.
    # Emulating this with random int for this example.
    return random.randint(1, 9)


btc_job_id = 'btc-notifier'
eth_job_id = 'eth-notifier'

if __name__ == '__main__':
    scheduler.start()

    # Running the example with the --clear switch will remove scheduled jobs.
    if len(sys.argv) > 1 and sys.argv[1] == '--clear':
        scheduler.remove_all_jobs()

    if scheduler.get_job(btc_job_id) is None:
        scheduler.add_job(check_and_notify, 'interval', ['btc', 40], seconds=60, id=btc_job_id)

    if scheduler.get_job(eth_job_id) is None:
        scheduler.add_job(check_and_notify, 'interval', ['eth', 3.5], seconds=30, id=eth_job_id)

    print('Press Ctrl+{0} to exit'.format('Break' if os.name == 'nt' else 'C'))
    # Instead of while looping, have some long-running processes. When the main process terminates, so does the scheduler.
    while True:
        # Keep the process running
        pass

