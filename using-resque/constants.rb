def connection_url()
    host = ENV['UPSTASH_REDIS_HOST']
    password = ENV['UPSTASH_REDIS_PASSWORD']
    port = ENV['UPSTASH_REDIS_PORT']
    "redis://:#{password}@#{host}:#{port}"
end

