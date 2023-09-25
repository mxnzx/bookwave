package com.ssafy.bookwave.bbti.dto.response;

import lombok.Builder;

public class BbtiResponseDto {

    private int id;
    private String name;
    private String content;

    @Builder
    public BbtiResponseDto(int id, String name, String content) {
        this.id = id;
        this.name = name;
        this.content = content;
    }
}
