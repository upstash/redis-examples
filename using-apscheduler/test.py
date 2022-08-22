from main import scheduler

scheduler.remove_all_jobs()
counter = 0
steps = 0

def increment_val():
    global counter, steps
    counter += 1
    steps += 1
    print('counter:', counter)

def decrement_val():
    global counter, steps
    counter -= 1
    steps += 1
    print('counter:', counter)


if __name__ == '__main__':
    len_initial = len(scheduler.get_jobs())

    id_inc = 'test_inc'
    id_dec = 'test_dec'

    scheduler.add_job(increment_val, 'interval', seconds=1, id=id_inc)
    scheduler.add_job(decrement_val, 'interval', seconds=2, id=id_dec)

    len_after = len(scheduler.get_jobs())

    if len_after != (len_initial + 2):
        raise Exception("Jobs haven't been scheduled.")

    while counter < 5:
        pass

    if steps < 70:
        print(steps)
        raise Exception("Decrement function didn't work.")
