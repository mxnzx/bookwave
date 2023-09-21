package com.ssafy.bookwave.member.dto;

import com.ssafy.bookwave.member.enums.SocialType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class LoginDto {

    private Integer id;
    private String socialId;
    private SocialType socialType;
    private String nickname;
    private boolean firstLogin;
}
