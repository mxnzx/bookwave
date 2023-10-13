package com.ssafy.bookwave.book.dto.response;

import com.ssafy.bookwave.record.dto.response.RecordPreviewResponseDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
@Builder
public class BookDetailResponseDto {

    private int id;
    private String isbn;
    private String imageUrl;
    private String title;
    private String author;
    private String publishDate;
    private String genre;
    private String publisher;
    private String content;
    private int state;
    private List<BookByBbtiChartResponseDto> bbtiChartList;
    private List<BookEmotionResponseDto> emotionChartList;
    private int recordListCnt;
    private List<RecordPreviewResponseDto> recordPreviewDtoList;
    private int bookshelfCnt;
    private double bookScore;


}
