# [Resque](https://github.com/resque/resque) Multiple Queue Processing

## A simple multiple queue processing with Resque using Upstash Redis

### We will enqueue different jobs from different kind of users.
Since we provide our services for free, paid users will have the priority to get their jobs done first....


### Configure Package
`bundle init`
`bundle add resque`

### Run Worker
Since enterprise processes have a higher priority than the free processes:
`QUEUE=enterprise,free rake resque:work`


### Populate Worker with processes
`ruby populate.rb` --> This will put some processes to the queue for worker to process.


### Resque Web Interface
Another cool thing with Resque is that they provide a web interface showcasing the state of the queues and workers. There, you can find many functionalities such as re-running failed jobs. To run the web ui:
`resque-web -p <preferred-port> -r <UPSTASH_REDIS_CONNECTION_URL>`
Then go to your `http://localhost:<preferred-port>`
