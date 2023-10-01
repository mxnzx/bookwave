package com.ssafy.bookwave.recommend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MoodRecommendResponseDto {
    private Integer moodId;
    private String moodType;
    private List<RecommendBookResponseDto> bookList;
}

