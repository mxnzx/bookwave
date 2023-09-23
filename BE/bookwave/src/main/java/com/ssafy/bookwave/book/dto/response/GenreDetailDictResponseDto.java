package com.ssafy.bookwave.book.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class GenreDetailDictResponseDto {
    private int id;
    private int genreDictId;
    private String name;

}
