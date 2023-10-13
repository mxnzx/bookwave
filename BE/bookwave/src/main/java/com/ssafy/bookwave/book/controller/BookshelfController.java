package com.ssafy.bookwave.book.controller;


import com.ssafy.bookwave.book.dto.response.BookshelfListResponseDto;
import com.ssafy.bookwave.book.enums.BookshelfResponseMessage;
import com.ssafy.bookwave.book.repository.BookshelfRepository;
import com.ssafy.bookwave.book.service.BookshelfService;
import com.ssafy.bookwave.global.util.ResponseTemplate;
import com.ssafy.bookwave.member.dto.response.GenreQuestionResponseDto;
import com.ssafy.bookwave.member.enums.GenreResponseMessage;
import com.ssafy.bookwave.member.enums.MemberResponseMessage;
import com.ssafy.bookwave.recommend.dto.response.GenreRecommendResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "Bookshelf", description = "책장 관련 API")
@RequiredArgsConstructor
@RestController
@Slf4j
@RequestMapping("/api/bookshelf")
public class BookshelfController {

    private final BookshelfService bookshelfService;


    @Operation(summary = "책장 리스트 불러오기", description = "로그인한 회원 책장 리스트 불러오기 API")
    @GetMapping("/list")
    public ResponseEntity<ResponseTemplate<BookshelfListResponseDto>> getBookshelfList(@RequestParam int memberId){

        BookshelfListResponseDto bookshelfListResponseDto = bookshelfService.getBookshelfList(memberId);

        return new ResponseEntity<>(
                ResponseTemplate.<BookshelfListResponseDto>builder()
                        .result(true)
                        .msg(BookshelfResponseMessage.BOOKSHELF_GETBOOKLIST_SUCCESS.getMessage())
                        .data(bookshelfListResponseDto)
                        .build(),
                HttpStatus.OK);
    }
}
