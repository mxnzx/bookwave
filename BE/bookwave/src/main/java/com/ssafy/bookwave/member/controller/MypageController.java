package com.ssafy.bookwave.member.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "MyPage", description = "마이페이지 관련 API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/members")
public class MypageController {

//    private final MemberService memberService;
//    private final MypageService mypageService;
//    private final WishDiaryService wishDiaryService;
//
//
//    //마이페이지 사용자 정보 조회
//    @Operation(summary = "마이페이지 사용자 정보 조회", description = "사용자 정보(닉네임,상테메세지,프로필사진경로)")
//    @GetMapping
//    public MemberInfoResponseDto defaultMemberInfo(HttpServletRequest httpServletRequest) {
//
//        String token = httpServletRequest.getHeader("Authorization");
//        if (token == null) return null;
//
//        Member findMember = memberService.findMemberByJwtToken(token);
//
//        return memberService.getMemberInfo(findMember);
//
//    }
//
//    //마이페이지 특정 사용자 정보 조회
//    @Operation(summary = "마이페이지 특정 사용자 정보 조회", description = "특정 사용자 정보(닉네임,상테메세지,프로필사진경로)")
//    @GetMapping("/{memberId}")
//    public MemberInfoResponseDto DetailMemberInfo(@PathVariable Integer memberId) {
//
//        return memberService.getDetailMemberInfo(memberId);
//
//    }
}
