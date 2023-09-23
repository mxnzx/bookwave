package com.ssafy.bookwave.book.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BookshelfBookResponseDto {

    private int id;
    private int memberId;
    private String bookId;
    private String state;
}
