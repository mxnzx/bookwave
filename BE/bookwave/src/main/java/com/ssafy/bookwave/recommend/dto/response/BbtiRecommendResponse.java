package com.ssafy.bookwave.recommend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class BbtiRecommendResponse {
    private String bbti;
    private List<RecommendBookResponseDto> bookList;
}
