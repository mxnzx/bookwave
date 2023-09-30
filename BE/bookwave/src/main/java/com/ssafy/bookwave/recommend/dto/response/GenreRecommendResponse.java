package com.ssafy.bookwave.recommend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class GenreRecommendResponse {
    //회원 선호 장르 이름 List로 넘겨줌
    private List<String> favoriteGenreList;
    //GenreBookList
    private Map<String,List<RecommendBookResponseDto>> GenreBookList;
}
