import time

# Simply reverse string, assume easy process
def reverse(email, string_to_process):
    time.sleep(1)
    print(f"reverse, {string_to_process}")

# Simply duplicate and append to string, assume medium process
def duplicate(email, string_to_process):
    time.sleep(2)
    print(f"duplicate, {string_to_process + string_to_process}")

# Simply do sth with string, assume difficult process
def sth(email, string_to_process):
    time.sleep(3)
    print(f"sth, {string_to_process}")



