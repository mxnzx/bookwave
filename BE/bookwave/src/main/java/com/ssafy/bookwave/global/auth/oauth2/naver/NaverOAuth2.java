package com.ssafy.bookwave.global.auth.oauth2.naver;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Component
public class NaverOAuth2 {
    @Value("${oauth2.naver.client-id}")
    String clientId;

    @Value("${oauth2.naver.client-secret}")
    private String clientSecret;
    private String getAccessToken(String authorizedCode, String naverState) {
        // HttpHeader 오브젝트 생성
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        // HttpBody 오브젝트 생성
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", clientId);
        params.add("client_secret",clientSecret);
        params.add("state",naverState);
//        params.add("redirect_uri", redirectUri);
        params.add("code", authorizedCode);

        // HttpHeader와 HttpBody를 하나의 오브젝트에 담기
        RestTemplate rt = new RestTemplate();
        HttpEntity<MultiValueMap<String, String>> naverTokenRequest =
                new HttpEntity<>(params, headers);

        // Http 요청
        ResponseEntity<String> response = rt.exchange(
                "https://nid.naver.com/oauth2.0/token",
                HttpMethod.POST,
                naverTokenRequest,
                String.class
        );

        // JSON -> 액세스 토큰 파싱
        String tokenJson = response.getBody();
        JSONObject json = new JSONObject(tokenJson);
        System.out.println("json = " + json);
        return json.getString("access_token");
    }

    private JSONObject requestMemberInfoJsonObject(String accessToken) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        // HttpHeader와 HttpBody를 하나의 오브젝트에 담기
        RestTemplate rt = new RestTemplate();
        HttpEntity<MultiValueMap<String, String>> naverProfileRequest = new HttpEntity<>(headers);

        // Http 요청하기
        ResponseEntity<String> response = rt.exchange(
                "https://openapi.naver.com/v1/nid/me",
                HttpMethod.POST,
                naverProfileRequest,
                String.class
        );

        // 사용자 정보 json 객체 리턴
        return new JSONObject(response.getBody());
    }

    private NaverMemberDto getMemberByAccessToken(String accessToken) {
        JSONObject body = requestMemberInfoJsonObject(accessToken);

        // 유저 정보 파싱
        JSONObject response = body.getJSONObject("response");
        String email = response.getString("email");
        String gender = response.getString("gender");
        String birth = response.getString("birth");
        String id = response.getString("id");


        return NaverMemberDto.builder()
                .socialId(id)
                .email(email)
                .gender(gender)
                .birth(birth)
                .build();
    }

    public NaverMemberDto getMemberInfo(String authorizedCode, String naverState) {
        // 1. 인가코드 -> 액세스 토큰
        String accessToken = getAccessToken(authorizedCode, naverState);
        // 2. 액세스 토큰 -> 카카오 사용자 정보
        return getMemberByAccessToken(accessToken);
    }

}
