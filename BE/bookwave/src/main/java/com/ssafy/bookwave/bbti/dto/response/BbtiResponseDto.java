package com.ssafy.bookwave.bbti.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class BbtiResponseDto {

    private String name;
    private String content;
    private int bookId;
    private String title;
    private String author;
    private String imageUrl;

    @Builder
    public BbtiResponseDto(String name, String content, int bookId, String title, String author, String imageUrl) {
        this.name = name;
        this.content = content;
        this.bookId = bookId;
        this.title = title;
        this.author = author;
        this.imageUrl = imageUrl;
    }
}
