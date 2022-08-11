require "sidekiq"

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

class OurWorker
    include Sidekiq::Worker
    def perform(complexity)
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


