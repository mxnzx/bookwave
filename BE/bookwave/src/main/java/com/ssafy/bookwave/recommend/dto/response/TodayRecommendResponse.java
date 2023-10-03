package com.ssafy.bookwave.recommend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TodayRecommendResponse {
    private String todayEmotion;
    private Integer bookId;
    private String bookTitle;
    private String bookAuthor;
    private String bookImgUrl;
}
