package com.ssafy.bookwave.global.auth.oauth2.kakao;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.json.JSONObject;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Component
public class KakaoOAuth2 {
    @Value("${oauth2.kakao.client-id}")
    String clientId;
    private String getAccessToken(String authorizedCode, String redirectUri) {
        // HttpHeader 오브젝트 생성
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        // HttpBody 오브젝트 생성
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", clientId);
        params.add("redirect_uri", redirectUri);
        params.add("code", authorizedCode);

        // HttpHeader와 HttpBody를 하나의 오브젝트에 담기
        RestTemplate rt = new RestTemplate();
        HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest =
                new HttpEntity<>(params, headers);
        // Http 요청
        ResponseEntity<String> response = rt.exchange(
                "https://kauth.kakao.com/oauth/token",
                HttpMethod.POST,
                kakaoTokenRequest,
                String.class
        );
        // JSON -> 액세스 토큰 파싱
        String tokenJson = response.getBody();
        System.out.println("tokenJson = " + tokenJson);
        JSONObject json = new JSONObject(tokenJson);
        return json.getString("access_token");
    }

    private JSONObject requestMemberInfoJsonObject(String accessToken) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        // HttpHeader와 HttpBody를 하나의 오브젝트에 담기
        RestTemplate rt = new RestTemplate();
        HttpEntity<MultiValueMap<String, String>> kakaoProfileRequest = new HttpEntity<>(headers);

        // Http 요청하기
        ResponseEntity<String> response = rt.exchange(
                "https://kapi.kakao.com/v2/user/me",
                HttpMethod.POST,
                kakaoProfileRequest,
                String.class
        );

        // 사용자 정보 json 객체 리턴
        return new JSONObject(response.getBody());
    }

    private KakaoMemberDto getMemberByAccessToken(String accessToken) {
        JSONObject body = requestMemberInfoJsonObject(accessToken);
        System.out.println("body = " + body);
        // 유저 정보 파싱

        JSONObject kakaoAccount = body.getJSONObject("kakao_account");
//        JSONObject profile = kakaoAccount.getJSONObject("profile");
        String email = kakaoAccount.getString("email");
        //String nickname = body.getJSONObject("properties").getString("nickname");
        //String profilePhoto = profile.getString("profile_image_url");
        String gender = kakaoAccount.getString("gender");
        String birth = kakaoAccount.getString("age_range");


        return KakaoMemberDto.builder()
                .socialId(Long.toString((Long) body.get("id")))
                .email(email)
                .gender(gender)
                .birth(birth)
                .build();
    }

    public KakaoMemberDto getMemberInfo(String authorizedCode, String redirectUri) {
        // 1. 인가코드 -> 액세스 토큰
        String accessToken = getAccessToken(authorizedCode, redirectUri);
        // 2. 액세스 토큰 -> 카카오 사용자 정보
        return getMemberByAccessToken(accessToken);
    }

}