require "sidekiq"
require "sidekiq/api"

# Sidekiq.logger.level = Logger::FATAL


host = ENV['UPSTASH_REDIS_HOST']
password = ENV['UPSTASH_REDIS_PASSWORD']
port = ENV['UPSTASH_REDIS_PORT']

connection_url = ENV['UPSTASH_REDIS_LINK']
connection_url = connection_url || "redis://:#{password}@#{host}:#{port}"

Sidekiq.configure_client do |config|
    config.redis = {url: connection_url}
end

Sidekiq.configure_server do |config|
    config.redis = {url: connection_url}
end


class EmailService
    include Sidekiq::Worker
    def perform(id, type)
        # Logic goes here. Let's assume sending email by printing to console.
        puts "Emailed to: " +  id + ": " + "'Congrats on " + type + " plan.'"
    end
end


def updateEmail(id, newType)
    # include Sidekiq::Job
    jobFound = false
    
    a = Sidekiq::ScheduledSet.new
    a.each do |job|
        if job.args[0] == id
            job.delete
            jobFound = true
        end
    end

    if jobFound
        EmailService.perform_async(id, ("starting using our service and upgrading it to " + newType))
    else
        EmailService.perform_async(id, ("upgrading to " + newType))
    end
end

def sendEmail(id, type)
    case type
    when "free"
        EmailService.perform_in("10", id, "free")
    when "paid"
        EmailService.perform_in("5", id, "paid")
    when "enterprise"
        EmailService.perform_async(id, "enterprise")
    when "enterprise10k"
        EmailService.perform_async(id, "enterprise10k")
    else
        puts "Only plans are: `free`, `paid` and `enterprise`"
    end
end

def clearSchedules()
    Sidekiq::ScheduledSet.new.clear
    Sidekiq::Queue.new.clear
end