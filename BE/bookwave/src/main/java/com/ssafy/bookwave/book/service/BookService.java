package com.ssafy.bookwave.book.service;

import com.ssafy.bookwave.book.dto.response.BookDetailResponseDto;
import com.ssafy.bookwave.book.dto.response.BookListBySearchResponseDto;
import com.ssafy.bookwave.member.domain.Member;

import java.util.List;

public interface BookService {

    BookDetailResponseDto getBookDetail(int bookId, Member findMember);

    void changeBookState(Integer memberId, int bookId, int bookState);

    List<BookListBySearchResponseDto> searchBookByKeyword(String keyword);

    List<BookListBySearchResponseDto> searchBookByGenre(int genreId);

    List<BookListBySearchResponseDto> searchBookByGenreAndKeyword(int genreId, String keyword);

}
