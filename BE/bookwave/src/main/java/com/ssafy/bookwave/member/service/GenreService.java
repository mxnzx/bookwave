package com.ssafy.bookwave.member.service;

import com.ssafy.bookwave.member.dto.response.GenreQuestionResponse;

import java.util.List;

public interface GenreService {
    GenreQuestionResponse getGenreList(int id);

}
