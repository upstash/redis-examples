require "sidekiq"
require "sidekiq/api"

Sidekiq.logger.level = Logger::FATAL

host = ENV['UPSTASH_REDIS_HOST']
password = ENV['UPSTASH_REDIS_PASSWORD']
port = ENV['UPSTASH_REDIS_PORT']
connection_url = "redis://:#{password}@#{host}:#{port}"

Sidekiq.configure_client do |config|
    config.redis = {url: connection_url}
end

Sidekiq.configure_server do |config|
    config.redis = {url: connection_url}
end


# Let's flush defualt ScheduledSet and Queue
Sidekiq::ScheduledSet.new.each do |job|
    job.delete
end
Sidekiq::Queue.new.each do |job|
    job.delete
end


class EmailService
    include Sidekiq::Worker
    def perform(name, action)
        # Logic goes here. Let's assume sending email.

        puts "Emailed to: " +  name + ": " + "'Congrats on " + action + " plan.'"
    end
end

def updateEmail(name, newAction)
    include Sidekiq::Job
    jobFound = false
    
    a = Sidekiq::ScheduledSet.new
    a.each do |job|
        puts job.klass
        puts job.args
        if job.args[0] == name
            job.delete
            puts "Job found. Deleting from the scheduled set."
            jobFound = true
        end
    end

    if jobFound
        puts "Job found. Creating a new Email"
        EmailService.perform_async(name, ("starting using our service and upgrading it to " + newAction))
    else
        EmailService.perform_async(name, ("upgrading to " + newAction))
    end
end

# EmailService.perform_async("veli", "enterprise")| bundle exec irb -r ./worker.rb


EmailService.perform_in("5", "name1", "free")
EmailService.perform_in("3", "name2", "paid")
EmailService.perform_async("name3", "enterprise")

# Sleep, so that some perform_in works, other one doesnt...
# sleep(3)

updateEmail("name1", "paid")
# updateEmail("name2", "enterprise")
# updateEmail("name3", "enterprise10k")


# Sidekiq::Shutdown

