import time
from app import huey

# Simply reverse string, assume easy process
@huey.task()
def reverse(email, string_to_process):
    time.sleep(1)
    print(f"Process finished: reverse, sending result: {string_to_process} to email: {email}")
    return string_to_process[::-1]

# Simply duplicate and append to string, assume difficult process
@huey.task()
def duplicate(email, string_to_process):
    time.sleep(3)
    print(f"Process finished: duplicate, sending result: {string_to_process + string_to_process} to email: {email}")
    return string_to_process + string_to_process
