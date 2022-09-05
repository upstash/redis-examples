# [Apscheduler](https://github.com/agronholm/apscheduler) with Upstash Redis

## A task scheduler, showcasing Apscheduler by using Upstash Redis.
For this example, we are running scheduled processing, where we fetch 'eth' and 'btc' coin prices (mocked up by random int generation - since many APIs exist).

Whenever the current value is above the threshold value, the process sends a notification to the email given (emulated by console logging.) 

### Install Dependencies
`pip install -r requirements.txt` 

### Start the process
`python3 main.py --clear` (remove `--clear` not to erase scheduled jobs)