package com.ssafy.bookwave.book.service;

import com.ssafy.bookwave.book.dto.response.BookshelfListResponseDto;

public interface BookshelfService {
    BookshelfListResponseDto getBookshelfList(int memberId);
}
