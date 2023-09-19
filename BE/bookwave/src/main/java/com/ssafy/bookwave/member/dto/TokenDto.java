package com.ssafy.bookwave.member.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class TokenDto {

    private String accessToken;
    private String refreshToken;
    private Integer id;

    @Builder
    public TokenDto(String accessToken, String refreshToken, Integer id) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.id = id;
    }
}