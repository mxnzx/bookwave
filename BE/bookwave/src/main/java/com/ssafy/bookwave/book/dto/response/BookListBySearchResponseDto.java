package com.ssafy.bookwave.book.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class BookListBySearchResponseDto {

    private int bookId;
    private String bookImageUrl;
    private String bookTitle;
    private String author;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private String publishDate;
    private double score;
    private int bookShelfCnt;
    private int genre;
}
