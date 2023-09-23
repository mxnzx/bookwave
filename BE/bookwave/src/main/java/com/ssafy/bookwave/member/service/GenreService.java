package com.ssafy.bookwave.member.service;

import com.ssafy.bookwave.member.dto.response.GenreQuestionResponse;

import java.util.List;

public interface GenreService {
    GenreQuestionResponse getGenreList(int memberId);

    void registGenre(int memberId, List<Integer> genreList);
}
