package com.ssafy.bookwave.recommend.dto.response;

import lombok.*;

@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class RecommendBookResponseDto {

    private int bookId;
    private String bookImageUrl;
    private String bookTitle;
    private String author;

}
