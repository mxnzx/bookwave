package com.ssafy.bookwave.member.dto.response;

import com.ssafy.bookwave.book.dto.response.GenreDictResponseDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
@Builder
public class FavoriteGenreResponseDto {
    //회원의 최애 장르 최대 3개 response
    List<GenreDictResponseDto> genreDictResponseDtoList;

}
