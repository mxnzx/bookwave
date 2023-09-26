package com.ssafy.bookwave.book.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class GenreDictResponseDto {
    private int id;
    private String name;

}
