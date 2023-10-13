package com.ssafy.bookwave.book.service;

import com.ssafy.bookwave.book.domain.BookshelfBook;
import com.ssafy.bookwave.book.dto.response.BookBookshelfResponseDto;
import com.ssafy.bookwave.book.dto.response.BookshelfListResponseDto;
import com.ssafy.bookwave.book.repository.BookshelfRepository;
import com.ssafy.bookwave.global.exception.validator.MemberValidator;
import com.ssafy.bookwave.member.domain.Member;
import com.ssafy.bookwave.member.repository.MemberRepository;
import com.ssafy.bookwave.record.dto.request.RecordBookshelfResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@Service
public class BookshelfServiceImpl implements BookshelfService{

    private final MemberRepository memberRepository;
    private final MemberValidator memberValidator;
    private final BookshelfRepository bookshelfRepository;

    @Override
    public BookshelfListResponseDto getBookshelfList(int memberId) {
        // 로그인한 회원
        Member member = getMember(memberId);

        // 회원의 책장 목록 불러오기
        List<BookshelfBook> bookshelfBook = bookshelfRepository.findByMemberId(member.getId());

        List<BookBookshelfResponseDto> wishBook = new ArrayList<>();
        List<BookBookshelfResponseDto> readingBook = new ArrayList<>();
        List<BookBookshelfResponseDto> doneBook = new ArrayList<>();

        for (BookshelfBook book : bookshelfBook) {
            // 읽고 싶은 책
            if(book.getState().getValue() == 0){
                BookBookshelfResponseDto bookBookshelfResponseDto = BookBookshelfResponseDto.builder()
                        .bookId(book.getBook().getId())
                        .isbn(book.getBook().getIsbn())
                        .bookImageUrl(book.getBook().getImageUrl())
                        .bookTitle(book.getBook().getTitle())
                        .bookAuthor(book.getBook().getAuthor())
                        .build();
                wishBook.add(bookBookshelfResponseDto);
            }
            // 읽는중인 책
            if(book.getState().getValue() == 1){
                BookBookshelfResponseDto bookBookshelfResponseDto = BookBookshelfResponseDto.builder()
                        .bookId(book.getBook().getId())
                        .isbn(book.getBook().getIsbn())
                        .bookImageUrl(book.getBook().getImageUrl())
                        .bookTitle(book.getBook().getTitle())
                        .bookAuthor(book.getBook().getAuthor())
                        .build();
                readingBook.add(bookBookshelfResponseDto);
            }
            // 읽은 책
            if(book.getState().getValue() == 2){
                BookBookshelfResponseDto bookBookshelfResponseDto = BookBookshelfResponseDto.builder()
                        .bookId(book.getBook().getId())
                        .isbn(book.getBook().getIsbn())
                        .bookImageUrl(book.getBook().getImageUrl())
                        .bookTitle(book.getBook().getTitle())
                        .bookAuthor(book.getBook().getAuthor())
                        .build();
                doneBook.add(bookBookshelfResponseDto);
            }
        }

        // 읽는중인 책과 읽은 책 리스트 두개를 담는 Dto
        return BookshelfListResponseDto.builder()
                .userNickname(member.getNickname())
                .wishBookList(wishBook)
                .readingBookList(readingBook)
                .doneBookList(doneBook)
                .build();

    }

    private Member getMember(int memberId) {
        Optional<Member> member = memberRepository.findById(memberId);
        memberValidator.checkMember(member, memberId);
        return member.get();
    }

}
