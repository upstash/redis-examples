# Sidekiq Email Notifier and Process Simulator

## 2 simple scenarios, showcasing Sidekiq background job processing capabilities by using Upstash Redis

### Run Server


### Run Client
`bundle exec irb -r ./sendEmail.rb`
#### Send processes via Client
`EmailService.perform_in("3", <name>, <type>)` for scheduled run.


