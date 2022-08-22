from socket import timeout
from huey import RedisHuey, crontab
import os
import random

host = os.environ['UPSTASH_REDIS_HOST']
password = os.environ['UPSTASH_REDIS_PASSWORD']
port = os.environ['UPSTASH_REDIS_PORT']

url = "redis://:{}@{}:{}".format(password, host, port)
huey = RedisHuey('eth-app', host=host, port=port, password=password)


@huey.periodic_task(crontab(minute='*'), retries=2, retry_delay=10)
def check_and_notify(coin, threshold):
    current_value = check_price(coin)
    print('current val:', current_value)

    if current_value > threshold:
        notify(f'webhook_{coin}', f'{coin} mesage')
        # return f'Passed threshold with: {current_value} > {threshold}'
    
    # return f"Value threshold is not passed for {coin}"
    return current_value


@huey.task()
def notify(webhook, message):
    # Send message, email or any kind of notifier.
    print(f'Sending {message} to webhook: {webhook}')
    return webhook + ": " + message


def check_price(coin):
    # Here, ideally call another API endpoint to get values.
    # Emulating this with random int for this example.
    return random.randint(1, 9)
