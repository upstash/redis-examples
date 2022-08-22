# Huey Periodic Job Runs

## Simple periodic job running, using Huey python library.
You can configure a lightweight task queue for your applications with Huey, Using Upstash Redis. 

Here, we have a cron job running every 5 minutes to get coin prices with given thresholds so that the user can be notified if the current value is higher than the threshold defined. Retry mechanism is also applied, so that if we hit an external API error rate encounter rate limiting, we can try again for the same task.

Since there are multiple different API's for fetching this kind of information. we will simply emulate via random numbers. We will do a similar thing for notification as well.

### Install Dependencies
`pip install -r requirements.txt`

### Run Huey Worker
`huey_consumer.py coin.huey`

### Generate the job
```
>>> from coin import check_and_notify, check_price

>>> check_and_notify('eth', 3.5)
>>> check_and_notify('btc', 40)

>>> eth_now = check_price('eth')
>>> eth_now()

>>> btc_now = check_price('btc')
>>> btc_now()
```