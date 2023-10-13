package com.ssafy.bookwave.recommend.service;

import com.ssafy.bookwave.book.dto.response.GenreDictResponseDto;
import com.ssafy.bookwave.member.domain.Member;
import com.ssafy.bookwave.member.dto.response.FavoriteGenreResponseDto;
import com.ssafy.bookwave.recommend.dto.response.*;

import java.util.List;
import java.util.Map;

public interface RecommendService {

    //genre recommend service
    GenreRecommendResponse getGenreRecommendList(Member findMember);

    //detail id에 따른 bookList
    Map<String, List<RecommendBookResponseDto>> getFavoriteBookList(FavoriteGenreResponseDto favoriteGenreList);

    RecentRecommendResponse getRecentRecommendList(Member findMember);

    //bbti 기반 recommend service
    BbtiRecommendResponse getBbtiRecommendList(Member findMember);

    MoodRecommendResponse getMoodRecommendList(Member findMember);

    TodayRecommendResponse getTodayRecommendBook(Member findMember);
}
