package com.ssafy.bookwave.member.dto.response;

import com.ssafy.bookwave.book.domain.GenreDict;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
public class GenreQuestionResponse {

    private List<GenreDict> genreDictList;

    @Builder
    public GenreQuestionResponse(List<GenreDict> genreDictList) {
        this.genreDictList = genreDictList;
    }
}
