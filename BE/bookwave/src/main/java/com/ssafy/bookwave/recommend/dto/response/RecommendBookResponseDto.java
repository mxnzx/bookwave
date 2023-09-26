package com.ssafy.bookwave.recommend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class RecommendBookResponseDto {

    private int bookId;
    private String bookImageUrl;
    private String bookTitle;
    private String author;

}
