package com.ssafy.bookwave.recommend.controller;

import com.ssafy.bookwave.global.util.ResponseTemplate;
import com.ssafy.bookwave.member.domain.Member;
import com.ssafy.bookwave.member.enums.MemberResponseMessage;
import com.ssafy.bookwave.member.service.MemberService;
import com.ssafy.bookwave.recommend.dto.response.*;
import com.ssafy.bookwave.recommend.enums.RecommendResponseMessage;
import com.ssafy.bookwave.recommend.service.RecommendService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Tag(name="Recommend", description = "추천 관련 API")
@RestController
@RequiredArgsConstructor
@EnableWebMvc
@Slf4j
@RequestMapping("/api/recommend")
public class RecommendController {
    private final MemberService memberService;
    private final RecommendService recommendService;

    @Operation(summary = "선호하는 장르 책 조회", description = "회원의 선호하는 장르별 책 조회")
    @GetMapping("/genre-list")
    public ResponseEntity<ResponseTemplate<GenreRecommendResponse>> getFavoriteGenreRecommend(HttpServletRequest httpServletRequest)
    {
        String token = httpServletRequest.getHeader("Authorization");
        if (token == null) return null;
        Member findMember = memberService.findMemberByJwtToken(token);
        GenreRecommendResponse genreRecommendResponse = recommendService.getGenreRecommendList(findMember);
        return new ResponseEntity<>(
                ResponseTemplate.<GenreRecommendResponse>builder()
                        .result(true)
                        .msg(RecommendResponseMessage.GENRE_RECOMMEND_SUCCESS.getMessage())
                        .data(genreRecommendResponse)
                        .build(),
                HttpStatus.OK);
    }

    @Operation(summary = "최근 읽은 책과 비슷한 장르 조회", description = "회원의 최근 읽은 책과 비슷한 장르 조회")
    @GetMapping("/recent-list")
    public ResponseEntity<ResponseTemplate<RecentRecommendResponse>> getRecentRecommendList(HttpServletRequest httpServletRequest)
    {
        String token = httpServletRequest.getHeader("Authorization");
        if (token == null) return null;
        Member findMember = memberService.findMemberByJwtToken(token);
        RecentRecommendResponse recentRecommendResponse = recommendService.getRecentRecommendList(findMember);

        return new ResponseEntity<>(
                ResponseTemplate.<RecentRecommendResponse>builder()
                        .result(true)
                        .msg(RecommendResponseMessage.RECENT_RECOMMEND_SUCCESS.getMessage())
                        .data(recentRecommendResponse)
                        .build(),
                HttpStatus.OK);
    }

    @Operation(summary = "회원과 같은 bbti 회원이 많이 읽은 책", description = "같은 bbti를 가진 회원들의 책장에 있는 책들 중,읽고 있는 중 or 다 읽은 책 추천")
    @GetMapping("/bbti-list")
    public ResponseEntity<ResponseTemplate<BbtiRecommendResponse>> getBbtiRecommendList(HttpServletRequest httpServletRequest){
     String token = httpServletRequest.getHeader("Authorization");
     if(token==null) return null;
     Member findMember = memberService.findMemberByJwtToken(token);
     BbtiRecommendResponse bbtiRecommendResponse = recommendService.getBbtiRecommendList(findMember);

     return new ResponseEntity<>(
             ResponseTemplate.<BbtiRecommendResponse>builder()
                     .result(true)
                     .msg(RecommendResponseMessage.BBTI_RECOMMEND_SUCCESS.getMessage())
                     .data(bbtiRecommendResponse)
                     .build(),
             HttpStatus.OK);
    }


    @Operation(summary = "감정별 책 리스트 조회", description = "감정별 책 리스트 조회하기")
    @GetMapping("/mood-list")
    public ResponseEntity<ResponseTemplate<MoodRecommendResponse>> getMoodRecommendList(HttpServletRequest httpServletRequest){
        String token = httpServletRequest.getHeader("Authorization");
        if(token==null) return null;
        Member findMember = memberService.findMemberByJwtToken(token);
        MoodRecommendResponse moodRecommendResponse = recommendService.getMoodRecommendList(findMember);
        return new ResponseEntity<>(
                ResponseTemplate.<MoodRecommendResponse>builder()
                        .result(true)
                        .msg(RecommendResponseMessage.MOOD_RECOMMEND_SUCCESS.getMessage())
                        .data(moodRecommendResponse)
                        .build(),
                HttpStatus.OK);
    }


    @Operation(summary = "오늘의 책 추천", description = "오늘의 일기 분석 후 감정에 따라 책 한권 추천")
    @GetMapping("/today-book")
    public ResponseEntity<ResponseTemplate<TodayRecommendResponse>> getTodayRecommendBook(HttpServletRequest httpServletRequest){
        String token = httpServletRequest.getHeader("Authorization");
        if(token==null) return null;
        Member findMember = memberService.findMemberByJwtToken(token);
        TodayRecommendResponse todayRecommendResponse = recommendService.getTodayRecommendBook(findMember);
        return new ResponseEntity<>(
                ResponseTemplate.<TodayRecommendResponse>builder()
                        .result(true)
                        .msg(RecommendResponseMessage.MOOD_RECOMMEND_SUCCESS.getMessage())
                        .data(todayRecommendResponse)
                        .build(),
                HttpStatus.OK);
    }

}


