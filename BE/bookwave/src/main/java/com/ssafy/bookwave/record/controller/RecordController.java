package com.ssafy.bookwave.record.controller;

import com.ssafy.bookwave.book.dto.response.BookBookshelfResponseDto;
import com.ssafy.bookwave.global.util.ResponseTemplate;
import com.ssafy.bookwave.member.domain.Member;
import com.ssafy.bookwave.member.dto.response.BaseResponseDto;
import com.ssafy.bookwave.member.service.MemberService;
import com.ssafy.bookwave.record.domain.Comment;
import com.ssafy.bookwave.record.dto.request.*;
import com.ssafy.bookwave.record.dto.response.RecordDetailResponseDto;
import com.ssafy.bookwave.record.dto.response.RecordLikeRegistResponseDto;
import com.ssafy.bookwave.record.dto.response.RecordModifyInfoResponseDto;
import com.ssafy.bookwave.record.enums.RecordResponseMessage;
import com.ssafy.bookwave.record.service.RecordLikeService;
import com.ssafy.bookwave.record.service.RecordService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Tag(name = "Record", description = "레코드 관련 API")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/record")
public class RecordController {

    private final RecordService recordService;
    private final MemberService memberService;
    private final RecordLikeService recordLikeService;

//    @Value("${file.upload-dir}")
//    private String uploadDir;


    @Operation(summary = "책장 정보 불러오기", description = "레코드 글 등록 시 책장에서 읽는중인 책, 읽은 책 불러오기")
    @GetMapping("/bookshelf")
    public ResponseEntity<ResponseTemplate<RecordBookshelfResponseDto>> getBookshelf(@RequestParam int memberId) {

        RecordBookshelfResponseDto recordBookshelfResponseDto = recordService.getBookshelf(memberId);

        return new ResponseEntity<>(
                ResponseTemplate.<RecordBookshelfResponseDto>builder()
                        .msg(RecordResponseMessage.RECORD_BOOKSHELF_SUCCESS.getMessage())
                        .data(recordBookshelfResponseDto)
                        .result(true)
                        .build(),
                HttpStatus.OK);
    }

    @Operation(summary = "레코드 작성 시 선택 된 도서 정보 불러오기", description = "독후감 작성 시 책장 목록에서 선택 된 도서 정보 불러오기")
    @GetMapping("/book-info/{bookId}")
    public ResponseEntity<ResponseTemplate<BookBookshelfResponseDto>> getWriteRecordBook(@RequestParam int memberId, @PathVariable int bookId) {

        BookBookshelfResponseDto bookBookshelfResponseDto = recordService.getWriteRecordBook(memberId, bookId);

        return new ResponseEntity<>(
                ResponseTemplate.<BookBookshelfResponseDto>builder()
                        .msg(RecordResponseMessage.RECORD_WRITERECORDBOOK_SUCCESS.getMessage())
                        .data(bookBookshelfResponseDto)
                        .result(true)
                        .build(),
                HttpStatus.OK);

    }


    @Operation(summary = "독후감 글 작성", description = "독후감 글 작성")
    @PostMapping(value = "/regist", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ResponseTemplate<RecordResponseMessage>> registRecord(@RequestPart(value = "recordRegistRequest") RecordRegistRequestDto recordRegistRequest,
                                                                                @RequestPart(value = "recordPicture", required = false) MultipartFile recordPicture,
                                                                                HttpServletRequest httpServletRequest) throws IOException {

        String token = httpServletRequest.getHeader("Authorization");
        if (token == null) return null;

        Member findMember = memberService.findMemberByJwtToken(token);

        recordService.registRecord(recordRegistRequest, recordPicture,findMember);

        recordService.calScore(recordRegistRequest,findMember);



        return new ResponseEntity<>(
                ResponseTemplate.<RecordResponseMessage>builder()
                        .result(true)
                        .msg(RecordResponseMessage.RECORD_REGIST_SUCCESS.getMessage())
                        .build()
                , HttpStatus.OK);
    }

    @Operation(summary = "독후감 글 상세보기", description = "독후감 글 상세보기")
    @GetMapping("/view-detail/{recordId}")
    public ResponseEntity<ResponseTemplate<RecordDetailResponseDto>> getRecordDetail(@PathVariable("recordId") int recordId,
                                                                                     HttpServletRequest httpServletRequest) {

        String token = httpServletRequest.getHeader("Authorization");
        if (token == null) return null;

        Member findMember = memberService.findMemberByJwtToken(token);

        RecordDetailResponseDto recordDetailResponseDto = recordService.getRecordDetail(recordId, findMember);

        return new ResponseEntity<>(
                ResponseTemplate.<RecordDetailResponseDto>builder()
                        .msg(RecordResponseMessage.RECORD_RECORDDETAIL_SUCCESS.getMessage())
                        .data(recordDetailResponseDto)
                        .result(true)
                        .build(),
                HttpStatus.OK);
    }

    @Operation(summary = "독후감 글 수정하기", description = "독후감 글 수정하기")
    @PutMapping(value = "/modify", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ResponseTemplate<RecordResponseMessage>> modifyRecord(@RequestPart(value = "recordModifyRequest") RecordModifyRequest recordModifyRequest,
                                                                                @RequestPart(value = "recordPicture", required = false) MultipartFile recordPicture,
                                                                                HttpServletRequest httpServletRequest) throws IOException {


        String token = httpServletRequest.getHeader("Authorization");
        if (token == null) return null;

        Member findMember = memberService.findMemberByJwtToken(token);

        recordService.modifyRecord(recordModifyRequest, recordPicture,findMember);


        return new ResponseEntity<>(
                ResponseTemplate.<RecordResponseMessage>builder()
                        .result(true)
                        .msg(RecordResponseMessage.RECORD_MODIFY_SUCCESS.getMessage())
                        .build()
                , HttpStatus.OK);
    }

    @Operation(summary = "레코드 수정 정보 가져오기", description = "레코드 수정 시 고정으로 넣을 값 불러오기")
    @GetMapping("/modify-info/{recordId}")
    public ResponseEntity<ResponseTemplate<RecordModifyInfoResponseDto>> getModifyInfo(@PathVariable("recordId") int recordId,
                                                                                       HttpServletRequest httpServletRequest) {

        String token = httpServletRequest.getHeader("Authorization");
        if (token == null) return null;

        Member findMember = memberService.findMemberByJwtToken(token);

        RecordModifyInfoResponseDto recordModifyInfoResponseDto = recordService.getModifyInfo(recordId, findMember);

        return new ResponseEntity<>(
                ResponseTemplate.<RecordModifyInfoResponseDto>builder()
                        .result(true)
                        .msg(RecordResponseMessage.RECORD_MODIFY_INFO_SUCCESS.getMessage())
                        .data(recordModifyInfoResponseDto)
                        .build()
                , HttpStatus.OK);

    }

    @Operation(summary = "독후감 글 삭제하기", description = "독후감 글 삭제하기, 삭제 시 댓글과 좋아요 모두 삭제 ")
    @DeleteMapping("/delete/{recordId}")
    public ResponseEntity<ResponseTemplate<RecordResponseMessage>> deleteRecord(@PathVariable("recordId") int recordId,
                                                                                HttpServletRequest httpServletRequest) {
        String token = httpServletRequest.getHeader("Authorization");
        if (token == null) return null;

        Member findMember = memberService.findMemberByJwtToken(token);

        // 댓글 먼저 삭제
        recordService.deleteAllComments(recordId, findMember);

        // 좋아요 삭제
        recordService.deleteAllLike(recordId, findMember);

        // 레코드 삭제
        recordService.deleteRecord(recordId, findMember);

        return new ResponseEntity<>(
                ResponseTemplate.<RecordResponseMessage>builder()
                        .result(true)
                        .msg(RecordResponseMessage.RECORD_DELETE_SUCCESS.getMessage())
                        .build()
                , HttpStatus.OK);
    }

    @Operation(summary = "독후감 좋아요", description = "독후감 좋아요 표시 , 좋아요 했다면 취소 , 안했으면 등록")
    @PutMapping("/like")
    public ResponseEntity<ResponseTemplate<RecordLikeRegistResponseDto>> likeRecord(@RequestBody RecordLikeRequest recordLikeRequest,
                                                                                    HttpServletRequest httpServletRequest) {

        String token = httpServletRequest.getHeader("Authorization");
        if (token == null) return null;

        Member findMember = memberService.findMemberByJwtToken(token);
        RecordLikeRegistResponseDto recordLikeRegistResponseDto = recordLikeService.changeLike(recordLikeRequest, findMember);

        return new ResponseEntity<>(
                ResponseTemplate.<RecordLikeRegistResponseDto>builder()
                        .result(true)
                        .msg(RecordResponseMessage.RECORD_LIKE_SUCCESS.getMessage())
                        .data(recordLikeRegistResponseDto)
                        .build()
                , HttpStatus.OK);
    }

    @Operation(summary = "레코드 댓글 작성", description = "레코드 댓글 작성")
    @PostMapping("/comment/regist")
    public ResponseEntity<ResponseTemplate<RecordResponseMessage>> registComment(@RequestBody RecordCommentRequest recordCommentRequest,
                                                                                 HttpServletRequest httpServletRequest) {
        String token = httpServletRequest.getHeader("Authorization");
        if (token == null) return null;

        Member findMember = memberService.findMemberByJwtToken(token);

        recordService.registRecordComment(recordCommentRequest, findMember);

        return new ResponseEntity<>(
                ResponseTemplate.<RecordResponseMessage>builder()
                        .result(true)
                        .msg(RecordResponseMessage.RECORD_REGIST_COMMENT_SUCCESS.getMessage())
                        .build()
                , HttpStatus.OK);
    }

    @Operation(summary = "레코드 댓글 삭제", description = "레코드 댓글 삭제하기")
    @DeleteMapping("/comment/delete/{commentId}")
    public ResponseEntity<ResponseTemplate<RecordResponseMessage>> deleteComment(@PathVariable("commentId") int commentId,
                                                                                 HttpServletRequest httpServletRequest) {

        String token = httpServletRequest.getHeader("Authorization");
        if (token == null) return null;

        Member findMember = memberService.findMemberByJwtToken(token);

        recordService.deleteComment(commentId, findMember);

        return new ResponseEntity<>(
                ResponseTemplate.<RecordResponseMessage>builder()
                        .result(true)
                        .msg(RecordResponseMessage.RECORD_DELETE_COMMENT_SUCCESS.getMessage())
                        .build()
                , HttpStatus.OK);
    }

    @Operation(summary = "피드페이지 독후감 리스트 불러오기", description = "피드페이지 독후감 리스트 불러오기")
    @GetMapping("/view-list/{memberId}")
    //memberId: 로그인된 사용자
    //httpServletRequest: 로그인된 사용자
    public BaseResponseDto getFidList(@PathVariable("memberId") int memberId, HttpServletRequest httpServletRequest) {
        String token = httpServletRequest.getHeader("Authorization");
        if (token == null) return null;
        Member findMember = memberService.findMemberByJwtToken(token);
        return recordService.getFidList(memberId,findMember);
    }

    @Operation(summary = "피드페이지 사용자 정보 불러오기", description = "피드페이지 사용자 불러오기")
    @GetMapping("/memberlist")
    public BaseResponseDto getFidMemberList(HttpServletRequest httpServletRequest) {
        String token = httpServletRequest.getHeader("Authorization");
        if (token == null) return null;
        Member findMember = memberService.findMemberByJwtToken(token);
        return recordService.getFidMemberList(findMember);
    }

}
