package com.ssafy.bookwave.global.auth.oauth2.kakao;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;

@Data
@AllArgsConstructor
@Builder
public class KakaoMemberDto {
    private String socialId;
    private String email;
    private String gender;
    private String birth;

}
