package com.ssafy.bookwave.book.controller;

import com.ssafy.bookwave.book.domain.Book;
import com.ssafy.bookwave.book.dto.request.BookStateRequestDto;
import com.ssafy.bookwave.book.dto.response.BookDetailResponseDto;
import com.ssafy.bookwave.book.dto.response.BookListBySearchResponseDto;
import com.ssafy.bookwave.book.dto.response.BookSearchResponseDto;
import com.ssafy.bookwave.book.dto.response.BookshelfListResponseDto;
import com.ssafy.bookwave.book.enums.BookResponseMessage;
import com.ssafy.bookwave.book.enums.BookshelfResponseMessage;
import com.ssafy.bookwave.book.service.BookService;
import com.ssafy.bookwave.global.util.ResponseTemplate;
import com.ssafy.bookwave.member.domain.Member;
import com.ssafy.bookwave.member.service.MemberService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Tag(name = "Book", description = "도서 관련 API")
@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/books")
public class BookController {

    private final BookService bookService;
    private final MemberService memberService;

    //이거 안씀
    @Operation(summary = "도서 검색어로 검색하고, 장르별 필터링되어 검색하기", description = "도서 검색어 검색 & 장르 필터링 검색하기 API")
    @GetMapping("/search-genre-keyword/{genre}")
    private ResponseEntity<ResponseTemplate<BookSearchResponseDto>> searchBookByGenrAndKeyword(@PathVariable("genre") int genreId,
                                                                                      @RequestParam("keyword") String keyword,
                                                                                      HttpServletRequest httpServletRequest) {
//        // http 토큰으로 멤버
//        String token = httpServletRequest.getHeader("Authorization");
//        if(token == null) return null;
//
//        Member findMember = memberService.findMemberByJwtToken(token);

        List<BookListBySearchResponseDto> bookList = bookService.searchBookByGenreAndKeyword(genreId, keyword);

        BookSearchResponseDto bookSearchResponseDto = BookSearchResponseDto.builder()
                .bookList(bookList)
                .build();

        return ResponseEntity.ok(
                ResponseTemplate.<BookSearchResponseDto>builder()
                        .msg(BookResponseMessage.BOOK_SEARCHBYKEYWORD_SUCCESS.getMessage())
                        .data(bookSearchResponseDto)
                        .result(true)
                        .build()
        );
    }

    @Operation(summary = "도서 장르별로 검색하기", description = "도서 장르별로 검색하기 API")
    @GetMapping("/search-genre/{genre}")
    private ResponseEntity<ResponseTemplate<BookSearchResponseDto>> searchBookByGenre(@PathVariable("genre") int genreId,
                                                                                      HttpServletRequest httpServletRequest) {
//        // http 토큰으로 멤버
//        String token = httpServletRequest.getHeader("Authorization");
//        if(token == null) return null;
//
//        Member findMember = memberService.findMemberByJwtToken(token);

        List<BookListBySearchResponseDto> bookList = bookService.searchBookByGenre(genreId);

        BookSearchResponseDto bookSearchResponseDto = BookSearchResponseDto.builder()
                .bookListCnt(bookList.size())
                .bookList(bookList)
                .build();

        return ResponseEntity.ok(
                ResponseTemplate.<BookSearchResponseDto>builder()
                        .msg(BookResponseMessage.BOOK_SEARCHBYKEYWORD_SUCCESS.getMessage())
                        .data(bookSearchResponseDto)
                        .result(true)
                        .build()
        );
    }

    @Operation(summary = "도서 검색어로 검색하기", description = "도서 검색어(키워드)로 검색하기 API")
    @GetMapping("/search-keyword")
    private ResponseEntity<ResponseTemplate<BookSearchResponseDto>> searchBookByKeyword(@RequestParam("keyword") String keyword,
                                                                                        HttpServletRequest httpServletRequest) {
        // http 토큰으로 멤버
        String token = httpServletRequest.getHeader("Authorization");
        if(token == null) {
            log.info("토큰 Null 처리됨");
            return null;
        }
        Member findMember = memberService.findMemberByJwtToken(token);

        List<BookListBySearchResponseDto> bookList = bookService.searchBookByKeyword(keyword);

        BookSearchResponseDto bookSearchResponseDto = BookSearchResponseDto.builder()
                .bookListCnt(bookList.size())
                .bookList(bookList)
                .build();

        return ResponseEntity.ok(
                ResponseTemplate.<BookSearchResponseDto>builder()
                        .msg(BookResponseMessage.BOOK_SEARCHBYKEYWORD_SUCCESS.getMessage())
                        .data(bookSearchResponseDto)
                        .result(true)
                        .build()
        );
    }

    @Operation(summary = "도서 상세 불러오기", description = "도서 상세 페이지 불러오기 API")
    @GetMapping("/detail/{bookId}")
    private ResponseEntity<ResponseTemplate<BookDetailResponseDto>> detailViewBook(@PathVariable("bookId") Integer bookId,
                                                                                      HttpServletRequest httpServletRequest) {
        // http 토큰으로 멤버
        String token = httpServletRequest.getHeader("Authorization");
        if(token == null) {
            log.info("토큰 Null 처리됨");
            return null;
        }
        Member findMember = memberService.findMemberByJwtToken(token);

        BookDetailResponseDto bookDetailResponseDto = bookService.getBookDetail(bookId, findMember);

        return ResponseEntity.ok(
                ResponseTemplate.<BookDetailResponseDto>builder()
                        .msg(BookResponseMessage.BOOK_GETBOOKDETAIL_SUCCESS.getMessage())
                        .data(bookDetailResponseDto)
                        .result(true)
                        .build()
        );
    }

    @Operation(summary = "도서 책장 상태 추가/수정", description = "도서 책장 상태가 처음 클릭되면 추가, 상태 변경되면 수정 API(읽고싶은(0), 읽는(1), 읽은(2), 선택해제(-1)")
    @PostMapping("/state-change")
    private ResponseEntity<ResponseTemplate<BookResponseMessage>> changeBookState(@RequestBody BookStateRequestDto bookStateRequestDto,
                                                              HttpServletRequest httpServletRequest) {

        String token = httpServletRequest.getHeader("Authorization");
        if(token == null) return null;

        Member findMember = memberService.findMemberByJwtToken(token);

        int bookId = bookStateRequestDto.getBookId();
        int bookState = bookStateRequestDto.getState();

        bookService.changeBookState(findMember.getId(), bookId, bookState);


        return ResponseEntity.ok(
                ResponseTemplate.<BookResponseMessage>builder()
                        .msg(BookResponseMessage.BOOK_CHANGEBOOKSTATE_SUCCCESS.getMessage())
                        .result(true)
                        .build()
        );

    }


}
