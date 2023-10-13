package com.ssafy.bookwave.member.controller;

import com.ssafy.bookwave.global.util.ResponseTemplate;
import com.ssafy.bookwave.member.domain.Member;
import com.ssafy.bookwave.member.dto.request.GenreRegistRequestDto;
import com.ssafy.bookwave.member.dto.response.FavoriteGenreResponseDto;
import com.ssafy.bookwave.member.dto.response.GenreQuestionResponseDto;
import com.ssafy.bookwave.member.enums.GenreResponseMessage;
import com.ssafy.bookwave.member.service.GenreService;
import com.ssafy.bookwave.member.service.MemberService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@Tag(name = "Genre", description = "장르 관련 API")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/genre")
public class GenreController {

    private final GenreService genreService;
    private final MemberService memberService;

    @Operation(summary = "장르 리스트 불러오기", description = "회원가입 시 전체 장르 리스트 불러오기 API")
    @GetMapping("/genre-question")
    public ResponseEntity<ResponseTemplate<GenreQuestionResponseDto>> getGenreList(@RequestParam int memberId){
        GenreQuestionResponseDto genreQuestionResponse = genreService.getGenreList(memberId);
        if(genreQuestionResponse.getGenreDictList().isEmpty()){
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(
                ResponseTemplate.<GenreQuestionResponseDto>builder()
                        .msg(GenreResponseMessage.GENRE_GETLIST_SUCCESS.getMessage())
                        .data(genreQuestionResponse)
                        .result(true)
                        .build()
        );
    }

    @Operation(summary = "선호 장르 등록", description = "회원가입 시 선호 장르 3가지 등록하는 API")
    @PostMapping("/regist")
    public ResponseEntity<ResponseTemplate<GenreResponseMessage>> registGenre(@RequestParam int memberId, @RequestBody GenreRegistRequestDto genreRegistRequest){

        genreService.registGenre(memberId, genreRegistRequest.getGenreList());

        return ResponseEntity.ok(
                ResponseTemplate.<GenreResponseMessage>builder()
                        .msg(GenreResponseMessage.GENRE_GEGIST_SUCCESS.getMessage())
                        .result(true)
                        .build()
        );
    }

    @Operation(summary = "선호 장르 불러오기", description = "장르 재검사 시 기존에 등록한 선호장르 불러오기")
    @GetMapping
    public ResponseEntity<ResponseTemplate<FavoriteGenreResponseDto>> getGenre(HttpServletRequest httpServletRequest){

        String token = httpServletRequest.getHeader("Authorization");
        if (token==null) return null;

        Member findMember = memberService.findMemberByJwtToken(token);

        FavoriteGenreResponseDto favoriteGenreList = genreService.getFavoriteGenreList(findMember);

        return ResponseEntity.ok(
                ResponseTemplate.<FavoriteGenreResponseDto>builder()
                        .msg(GenreResponseMessage.GENRE_GET_SUCCESS.getMessage())
                        .data(favoriteGenreList)
                        .result(true)
                        .build()
        );
    }

}
