package com.ssafy.bookwave.global.config;

import org.springdoc.core.GroupedOpenApi;
import org.springdoc.core.SpringDocUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.annotation.AuthenticationPrincipal;


@Configuration
public class SwaggerConfig {

    static {
        SpringDocUtils.getConfig()
                .addAnnotationsToIgnore(AuthenticationPrincipal.class);
    }
    @Bean
    public GroupedOpenApi allApi() {
        return GroupedOpenApi.builder()
                .group("all")
                .pathsToMatch("/**")
                .build();
    }
    @Bean
    public GroupedOpenApi memberApi() {
        return GroupedOpenApi.builder()
                .group("member")
                .pathsToMatch("/api/members/**")
                .build();
    }

    @Bean
    public GroupedOpenApi reminderApi(){
        return GroupedOpenApi.builder()
                .group("reminder")
                .pathsToMatch("/api/reminder/**")
                .build();
    }

    @Bean
    public GroupedOpenApi genreApi(){
        return GroupedOpenApi.builder()
                .group("genre")
                .pathsToMatch("/api/genre/**")
                .build();
    }

    @Bean
    public GroupedOpenApi recordApi(){
        return GroupedOpenApi.builder()
                .group("record")
                .pathsToMatch("/api/record/**")
                .build();
    }

    @Bean
    public GroupedOpenApi bookshelfApi(){
        return GroupedOpenApi.builder()
                .group("bookshelf")
                .pathsToMatch("/api/bookshelf/**")
                .build();
    }
    // 나머지 도메인도 추후 추가하기

    @Bean
    public GroupedOpenApi recommendApi(){
        return GroupedOpenApi.builder()
                .group("recommend")
                .pathsToMatch("/api/recommend/**")
                .build();
    }

    @Bean
    public GroupedOpenApi booksApi(){
        return GroupedOpenApi.builder()
                .group("books")
                .pathsToMatch("/api/books/**")
                .build();
    }

    @Bean
    public GroupedOpenApi bbtiApi(){
        return GroupedOpenApi.builder()
                .group("bbti")
                .pathsToMatch("/api/bbti/**")
                .build();
    }

    @Bean
    public GroupedOpenApi diaryApi(){
        return GroupedOpenApi.builder()
                .group("diary")
                .pathsToMatch("/api/diary/**")
                .build();
    }
}
