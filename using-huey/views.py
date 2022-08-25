from app import app
from flask import request
from tasks import reverse, duplicate

@app.route("/")
def hello_world():
    return "Parallel Processor!\n"


@app.route("/submit", methods=['POST'])
def processJob():
    json = request.get_json()
    email = json['email']
    string_to_process = json['string_to_process']

    print('start tasks')

    # Run 2 processes with same inputs
    reverse(email=email, string_to_process=string_to_process)
    duplicate(email=email, string_to_process=string_to_process)

    print('tasks enqued.')

    return 'OK\n'
