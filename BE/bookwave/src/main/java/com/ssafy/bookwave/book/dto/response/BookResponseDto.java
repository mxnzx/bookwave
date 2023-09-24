package com.ssafy.bookwave.book.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class BookResponseDto {
    private int id;
    private int genreDetailDict;
    private String isbn;
    private String title;
    private String author;
    private String content;
    private String imageUrl;
    private String publisher;
    private double score;
    private String publishDate;

}
