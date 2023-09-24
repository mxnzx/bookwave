package com.ssafy.bookwave.record.dto.request;

import com.ssafy.bookwave.book.domain.BookshelfBook;
import com.ssafy.bookwave.book.dto.response.BookBookshelfResponseDto;
import com.ssafy.bookwave.book.dto.response.BookshelfBookResponseDto;
import lombok.*;

import java.util.List;

@Data
@AllArgsConstructor
@Builder
public class RecordBookshelfResponseDto {

    private List<BookBookshelfResponseDto> readingBookList;
    private List<BookBookshelfResponseDto> doneBookList;


}
