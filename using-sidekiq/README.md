# Sidekiq Mailer

## A simple scenario, showcasing Sidekiq background job processing capabilities by using Upstash Redis.

Assume you provide a service: When users sign-up for your service, you want to have an automated behaviour, whether it is generating user specific objects or adding them to your list of customers. For this kind of workflow, we will take automated emailing, emulated by simply console logging.

If the users are free or paid tier, you want to notify and welcome them to your platform after certain time: 3 hours, 3 days etc. After all, they may quit or delete their accounts. 

But whenever a user starts as an enterprise, you want to send notifications immediately, whenever the server is available.

Or when they upgrade their plan, you want to immediately congratulate them.

### Configure Package
`gem init` 

`gem add sidekiq`
### Run Server
`bundle exec sidekiq -r ./sendEmail.rb`

This command will start the server. From there on, any request coming from clients - or in the server itself - will be fetched and applied in this server.

### Run Client
`bundle exec irb -r ./sendEmail.rb`
#### Send processes via Client
`createEmail(<id>, <type>)` for scheduled run.
`updateEmail(<id>, <type>)` for updating the email to be sent.

( `client.sh` has some example calls and `sampleLogs.log` shows an example output regarding that .sh file )


