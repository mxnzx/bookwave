package com.ssafy.bookwave.book.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
public class BookEmotionResponseDto {

    private String emotionType;
    private Double emotionPercent;

    @Builder
    public BookEmotionResponseDto(String emotionType, Double emotionPercent) {
        this.emotionType = emotionType;
        this.emotionPercent = emotionPercent;
    }
}
