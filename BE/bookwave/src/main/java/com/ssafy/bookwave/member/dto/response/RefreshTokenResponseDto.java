package com.ssafy.bookwave.member.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;

@Getter
public class RefreshTokenResponseDto {
    private Integer id;
    private String message;

    @Builder
    public RefreshTokenResponseDto(Integer id, String message) {
        this.id = id;
        this.message = message;
    }
}
