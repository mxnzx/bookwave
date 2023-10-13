package com.ssafy.bookwave.member.service;

import com.ssafy.bookwave.member.domain.Member;
import com.ssafy.bookwave.member.dto.response.FavoriteGenreResponseDto;
import com.ssafy.bookwave.member.dto.response.GenreQuestionResponseDto;

import java.util.List;

public interface GenreService {
    GenreQuestionResponseDto getGenreList(int memberId);

    void registGenre(int memberId, List<Integer> genreList);

    //회원 최애 장르 3개 조회
    FavoriteGenreResponseDto getFavoriteGenreList(Member member);


}
