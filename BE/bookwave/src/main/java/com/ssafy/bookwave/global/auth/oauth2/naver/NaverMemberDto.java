package com.ssafy.bookwave.global.auth.oauth2.naver;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;

@Getter
public class NaverMemberDto {

    private String socialId;
    private String email;
    private String gender;
    private String birth;

    @Builder
    public NaverMemberDto(String socialId, String email, String gender, String birth) {
        this.socialId = socialId;
        this.email = email;
        this.gender = gender;
        this.birth = birth;
    }
}
