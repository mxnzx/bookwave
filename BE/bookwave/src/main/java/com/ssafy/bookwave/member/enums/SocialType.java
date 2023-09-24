package com.ssafy.bookwave.member.enums;

public enum SocialType {
    KAKAO("KAKAO"),
    NAVER("NAVER");

    private final String value;

    SocialType(String value){this.value=value;}
    public String getValue(){return value;}
}
