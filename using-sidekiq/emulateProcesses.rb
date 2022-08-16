require "sidekiq"

host = ENV['UPSTASH_REDIS_HOST']
password = ENV['UPSTASH_REDIS_PASSWORD']
port = ENV['UPSTASH_REDIS_PORT']

connection_url = "redis://:#{password}@#{host}:#{port}"


Sidekiq.configure_client do |config|
    config.redis = {url: connection_url, network_timeout: 5}
end

Sidekiq.configure_server do |config|
    config.redis = {url: connection_url, network_timeout: 5}
end

class OurWorker
    include Sidekiq::Worker
    def perform(complexity)
        puts complexity
        case complexity
        when "super_hard" 
            sleep 6
            puts "super hard stuff"
        when "hard"
            sleep 3
            puts "some hard work"
        else
            puts "easy peasy, lemon squeezy"
            sleep 1
        end
    end
end


OurWorker.perform_async("easy")
OurWorker.perform_async("hard")

Sidekiq::Client.push('class' => OurWorker, 'args' => ['super_hard'])



# Redis Sentinel? Probably what Upstash uses;
# FAILOVER --> For the cluster stuff, it can be configured but they say it is not default since most SAAS companies dont provide


# Send email to soeone maybe, depending on the response maybe cancel it...
# some worker may cancel other workers operations... maybe?
# Take name, action. If another worker cancells it, cancel it or change the behaviour...






