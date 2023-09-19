package com.ssafy.bookwave.member.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class LoginResponseDto {

    private Integer id;
    private String message;
    private String nickname;
    private Boolean firstLogin;
}
