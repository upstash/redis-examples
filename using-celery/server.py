from concurrent.futures import process
from celery.exceptions import TimeoutError
from flask import Flask, request
from tasks import process_task
import time

app = Flask(__name__)

@app.route('/')
def index():
    return "Celery With Upstash Redis!"


@app.route('/run', methods = ['POST'])
def run():
    json = request.get_json()
    id = json['id']
    email = json['email']
    diff = json['difficulty']

    process_task.apply_async((diff, id, email), task_id=id)

    return "Your process has been added to the queue.\n"


@app.route('/result', methods = ['POST'])
def result():
    # Here, take the results of the process from celery and do necessary logic with it.
    body = request.get_json()
    id = body['id']
    
    try:
        result = process_task.AsyncResult(id).get(timeout=1)
        return result
    except TimeoutError:
        return f"Process with id {id} does not exist.\n"
    
@app.route('/notify', methods = ['POST'])
def notify():
    results = request.get_json()
    email = results['email']

    # Simply handle your notification system: Send email, post via webhook etc.
    # It is also a good place to use celery tasks for sending notifications.
    print(f'Sending Email to {email} the results: {results}')
    return 'OK'

    