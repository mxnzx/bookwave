package com.ssafy.bookwave.member.dto.response;

import com.ssafy.bookwave.book.domain.GenreDict;
import com.ssafy.bookwave.book.dto.response.GenreDictResponseDto;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
public class GenreQuestionResponseDto {

    private List<GenreDictResponseDto> genreDictList;

    @Builder
    public GenreQuestionResponseDto(List<GenreDictResponseDto> genreDictList) {
        this.genreDictList = genreDictList;
    }
}
