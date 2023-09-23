package com.ssafy.bookwave.book.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ClickResponseDto {

    private int id;
    private int memberId;
    private int genreDetailDict;
    private int count;
}
