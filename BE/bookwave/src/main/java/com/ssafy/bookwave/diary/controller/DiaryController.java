package com.ssafy.bookwave.diary.controller;

import com.ssafy.bookwave.book.dto.response.BookDetailResponseDto;
import com.ssafy.bookwave.book.enums.BookResponseMessage;
import com.ssafy.bookwave.diary.dto.request.DiaryDeleteRequestDto;
import com.ssafy.bookwave.diary.dto.request.DiaryModifyRequestDto;
import com.ssafy.bookwave.diary.dto.request.DiaryRegistRequestDto;
import com.ssafy.bookwave.diary.dto.response.DiaryDetailResponseDto;
import com.ssafy.bookwave.diary.enums.DiaryResponseMessage;
import com.ssafy.bookwave.diary.service.DiaryService;
import com.ssafy.bookwave.global.util.ResponseTemplate;
import com.ssafy.bookwave.member.domain.Member;
import com.ssafy.bookwave.member.service.MemberService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import javax.servlet.http.HttpServletRequest;

@Tag(name = "Diary", description = "다이어리 관련 API")
@RestController
@RequiredArgsConstructor
@EnableWebMvc
@Slf4j
@RequestMapping("/api/diary")
public class DiaryController {

    private final DiaryService diaryService;
    private final MemberService memberService;

    @Operation(summary = "다이어리 글 작성하기",
            description = "다이어리 글 작성하기 요청을 등록하는 API")
    @PostMapping("/regist")
    public ResponseEntity<ResponseTemplate<DiaryResponseMessage>> regist(@RequestBody DiaryRegistRequestDto diaryRegistRequestDto,
                                                                         HttpServletRequest httpServletRequest) {

        // http 토큰으로 멤버 아이디 찾기
        String token = httpServletRequest.getHeader("Authorization");
        if(token == null) return null;

        Member findMember = memberService.findMemberByJwtToken(token);

        log.info("현재 토큰으로 찾은 멤버아이디 !!!!!!!! " + findMember.getId());
        diaryService.regist(findMember, diaryRegistRequestDto);

        return ResponseEntity.ok(
                ResponseTemplate.<DiaryResponseMessage>builder()
                        .msg(DiaryResponseMessage.DIARY_REGIST_SUCCESS.getMessage())
                        .result(true)
                        .build()
        );
    }

//    @Operation(summary = "일기(다이어리) 리스트 불러오기",
//            description = "마이페이지에서 일기 리스트 불러오는 요청 API")
//    @PostMapping("/regist")
//    public ResponseEntity<ResponseTemplate<DiaryResponseMessage>> list(HttpServletRequest httpServletRequest) {
//
//        // http 토큰으로 멤버 아이디 찾기
//        String token = httpServletRequest.getHeader("Authorization");
//        if(token == null) return null;
//
//        Member findMember = memberService.findMemberByJwtToken(token);
//
//        List<DiaryListResponseDto> diaryListResponseDtoList = diaryService.list(findMember.getId());
//
//        return ResponseEntity.ok(
//                ResponseTemplate.<DiaryResponseMessage>builder()
//                        .msg(DiaryResponseMessage.DIARY_REGIST_SUCCESS.getMessage())
//                        .result(true)
//                        .build()
//        );
//    }

    @Operation(summary = "다이어리 글 상세보기", description = "피드나 개인페이지에서 리마인더 클릭 시 상세보기 API")
    @GetMapping("/detail/{diaryId}")
    public ResponseEntity<ResponseTemplate<DiaryDetailResponseDto>> getDetail(@PathVariable("diaryId") Integer diaryId,
                                                                              HttpServletRequest httpServletRequest) {

        // http 토큰으로 멤버 아이디 찾기
        String token = httpServletRequest.getHeader("Authorization");
        if(token == null) return null;

        Member findMember = memberService.findMemberByJwtToken(token);

        return new ResponseEntity<>(
                ResponseTemplate.<DiaryDetailResponseDto>builder()
                        .msg(DiaryResponseMessage.DIARY_DETAIL_SUCCESS.getMessage())
                        .data(diaryService.getDetail(findMember.getId(), diaryId))
                        .result(true)
                        .build(),
                HttpStatus.OK);

    }

    @Operation(summary = "일기(다이어리) 글 수정하기", description = "다이어리 글 수정(내용,색상) API")
    @PutMapping("/modify")
    public ResponseEntity<ResponseTemplate<DiaryResponseMessage>> moidfy(@RequestBody DiaryModifyRequestDto diaryModifyRequest,
                                                                         HttpServletRequest httpServletRequest) {

        // http 토큰으로 멤버 아이디 찾기
        String token = httpServletRequest.getHeader("Authorization");
        if(token == null) return null;

        Member findMember = memberService.findMemberByJwtToken(token);


        diaryService.modify(diaryModifyRequest);

        return ResponseEntity.ok(
                ResponseTemplate.<DiaryResponseMessage>builder()
                        .result(true)
                        .msg(DiaryResponseMessage.DIARY_MODIFY_SUCCESS.getMessage())
                        .build()
        );
    }

    @Operation(summary = "다이어리 글 삭제하기", description = "다이어리 글 삭제(다이어리 아이디) API")
    @DeleteMapping("/delete/{diaryId}")
    public ResponseEntity<ResponseTemplate<DiaryResponseMessage>> delete(@PathVariable("diaryId") Integer diaryId,
                                                                         HttpServletRequest httpServletRequest) {
        // http 토큰으로 멤버 아이디 찾기
        String token = httpServletRequest.getHeader("Authorization");
        if(token == null) return null;

        Member findMember = memberService.findMemberByJwtToken(token);

        diaryService.delete(diaryId);

        return ResponseEntity.ok(
                ResponseTemplate.<DiaryResponseMessage>builder()
                        .result(true)
                        .msg(DiaryResponseMessage.DIARY_DELETE_SUCCESS.getMessage())
                        .build()
        );
    }

}
