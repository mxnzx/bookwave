package com.ssafy.bookwave.global.config;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.bookwave.global.util.property.RedisProperties;
import com.ssafy.bookwave.recommend.dto.response.RecommendBookResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

import java.util.List;
import java.util.Map;

@Configuration
@RequiredArgsConstructor
public class RedisConfig {

    private final RedisProperties redisProperties;
    /*
    RedisTemplate을 이용한 방식

    RedisConnectionFactory 인터페이스를 통해
    LettuceConnectionFactory를 생성하여 반환
     */
    @Bean
    public RedisConnectionFactory redisConnectionFactory() {
        RedisStandaloneConfiguration redisStandaloneConfiguration = new RedisStandaloneConfiguration();
        redisStandaloneConfiguration.setHostName(redisProperties.getREDIS_HOST());
        redisStandaloneConfiguration.setPort(redisProperties.getREDIS_PORT());
        redisStandaloneConfiguration.setPassword(redisProperties.getREDIS_PASSWORD());

        return new LettuceConnectionFactory(redisStandaloneConfiguration);
    }

    @Bean
    public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory redisConnectionFactory) {
        // redisTemplate를 받아와서 set, get, delete를 사용
        RedisTemplate<String, Object> redisTemplate = new RedisTemplate<>();
        /**
         * setKeySerializer, setValueSerializer 설정
         * redis-cli을 통해 직접 데이터를 조회 시 알아볼 수 없는 형태로 출력되는 것을 방지
         */
        redisTemplate.setKeySerializer(new StringRedisSerializer());
        redisTemplate.setValueSerializer(new Jackson2JsonRedisSerializer<>(String.class));
        redisTemplate.setConnectionFactory(redisConnectionFactory);

        return redisTemplate;
    }
    @Bean
    public RedisMessageListenerContainer redisMessageListener(RedisConnectionFactory connectionFactory) {
        RedisMessageListenerContainer container = new RedisMessageListenerContainer();
        container.setConnectionFactory(connectionFactory);
        return container;
    }

    @Bean
    public RedisTemplate<String, List<RecommendBookResponseDto>> recommendBookRedisTemplate(RedisConnectionFactory factory) {
        RedisTemplate<String, List<RecommendBookResponseDto>> template = new RedisTemplate<>();

        ObjectMapper objectMapper = new ObjectMapper();
        JavaType type = objectMapper.getTypeFactory().constructCollectionType(List.class, RecommendBookResponseDto.class);
        Jackson2JsonRedisSerializer<List<RecommendBookResponseDto>> jackson2JsonRedisSerializer = new Jackson2JsonRedisSerializer<>(type);
        jackson2JsonRedisSerializer.setObjectMapper(objectMapper);

        template.setValueSerializer(jackson2JsonRedisSerializer);
        template.setHashValueSerializer(jackson2JsonRedisSerializer);
        template.setKeySerializer(new StringRedisSerializer());
        template.setHashKeySerializer(new StringRedisSerializer());
        template.setConnectionFactory(factory);
        return template;
    }

    @Bean
    public RedisTemplate<String, Map<String,Object>> todayEmotionRedisTemplate(RedisConnectionFactory factory){
        RedisTemplate<String, Map<String,Object>> template = new RedisTemplate<>();

        // JSON으로 데이터를 저장하고 검색하기 위한 serializer 설정
        GenericJackson2JsonRedisSerializer jackson2JsonRedisSerializer = new GenericJackson2JsonRedisSerializer();

        template.setValueSerializer(jackson2JsonRedisSerializer);
        template.setHashValueSerializer(jackson2JsonRedisSerializer);
        template.setKeySerializer(new StringRedisSerializer());
        template.setHashKeySerializer(new StringRedisSerializer());

        template.setConnectionFactory(factory);

        return template;
    }


}
