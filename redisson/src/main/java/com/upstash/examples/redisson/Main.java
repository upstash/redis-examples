package com.upstash.examples.redisson;

import org.redisson.Redisson;
import org.redisson.api.RMap;
import org.redisson.api.RedissonClient;
import org.redisson.config.Config;

public class Main {

    public static void main(String[] args) {
        Config config = new Config();
        config.useSingleServer().setPassword("YOUR_PASSWORD")
                // use "rediss://" for SSL connection
                .setAddress("YOUR_ENDPOINT");
        RedissonClient redisson = Redisson.create(config);
        RMap<String, String> map = redisson.getMap("map");
        map.put("foo", "bar");
        System.out.println(map.get("foo"));
    }
}
