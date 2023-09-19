package com.ssafy.bookwave.global.util.property;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class RedirectUrlProperties {

    public static String KAKAO_REDIRECT_URL;

    public RedirectUrlProperties(@Value("${oauth2.kakao.redirect-uri}") String kakaoRedirectUrl) {
        KAKAO_REDIRECT_URL = kakaoRedirectUrl;
    }
}
