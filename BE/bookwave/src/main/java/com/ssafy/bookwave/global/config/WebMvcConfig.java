package com.ssafy.bookwave.global.config;

import com.ssafy.bookwave.global.util.property.ApplicationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOriginPatterns("*")
//                .allowedOrigins("*")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .exposedHeaders(
                        "Authorization", "Access-Token",
                        "Authorization-Refresh", "Refresh-Token")
                .maxAge(3600);
    }

    // 나중에 이미지 업로드 할 때 수정하기
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/img/member/**","/img/record/**")
                .addResourceLocations(
                        "file:////bookwave/upload/images/member/","file:////bookwave/upload/images/record/"
                        );
//                .setCachePeriod(60 * 10)
//                .resourceChain(true);
    }

}