package com.ssafy.bookwave.book.service;

import com.ssafy.bookwave.book.dto.response.BookDetailResponseDto;
import com.ssafy.bookwave.member.domain.Member;

public interface BookService {

    BookDetailResponseDto getBookDetail(int bookId, Member findMember);

}
