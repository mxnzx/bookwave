package com.ssafy.bookwave.member.service;

import com.ssafy.bookwave.member.dto.response.GenreQuestionResponseDto;

import java.util.List;

public interface GenreService {
    GenreQuestionResponseDto getGenreList(int memberId);

    void registGenre(int memberId, List<Integer> genreList);
}
