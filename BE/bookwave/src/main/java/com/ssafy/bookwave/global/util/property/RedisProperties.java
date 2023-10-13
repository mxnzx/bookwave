package com.ssafy.bookwave.global.util.property;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
@Getter
public class RedisProperties {
    public String REDIS_HOST;
    public int REDIS_PORT;
    public String REDIS_PASSWORD;

    public RedisProperties(@Value("${redis.host}") String redisHost,
                           @Value("${redis.port}") int redisPort,
                           @Value("${redis.password}") String redisPassword) {
        REDIS_HOST = redisHost;
        REDIS_PORT = redisPort;
        REDIS_PASSWORD = redisPassword;
    }
}
