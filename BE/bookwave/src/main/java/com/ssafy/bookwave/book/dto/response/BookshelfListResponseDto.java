package com.ssafy.bookwave.book.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@Builder
public class BookshelfListResponseDto {

    private List<BookBookshelfResponseDto> wishBookList;
    private List<BookBookshelfResponseDto> readingBookList;
    private List<BookBookshelfResponseDto> doneBookList;

}
