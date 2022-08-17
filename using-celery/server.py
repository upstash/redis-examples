from flask import Flask, request
from tasks import add, process_task

app = Flask(__name__)

@app.route('/')
def index():
    return "Simple addition started with 4 and 7"


@app.route('/run', methods = ['POST'])
def run():
    print('request method:', request.method)
    
    json = request.get_json()

    id = json['id']
    email = json['email']
    diff = json['difficulty']

    print(id, email, diff)


    process_task.delay(diff, id, email)

    return "Your process has been added to the queue.\n"