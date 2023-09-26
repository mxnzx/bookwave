package com.ssafy.bookwave.recommend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecentRecommendResponse {

    //최근 읽은 책 한권 랜덤 뽑기
    private String recentBookTitle;
    //최근 읽은책과 비슷한 장르의 책 모아둔 리스트
    private List<RecommendBookResponseDto> recentList;


}
