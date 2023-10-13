package com.ssafy.bookwave.member.controller;

import com.ssafy.bookwave.global.auth.jwt.JwtTokenProvider;
import com.ssafy.bookwave.global.util.ResponseTemplate;
import com.ssafy.bookwave.global.util.property.RedirectUrlProperties;
import com.ssafy.bookwave.member.domain.Member;
import com.ssafy.bookwave.member.dto.LoginDto;
import com.ssafy.bookwave.member.dto.TokenDto;
import com.ssafy.bookwave.member.dto.request.LoginRequestDto;
import com.ssafy.bookwave.member.dto.request.MemberInfoUpdateRequestDto;
import com.ssafy.bookwave.member.dto.request.NicknameRequestDto;
import com.ssafy.bookwave.member.dto.response.*;
import com.ssafy.bookwave.member.enums.MemberResponseMessage;
import com.ssafy.bookwave.member.service.MemberService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import javax.servlet.http.HttpServletRequest;

@Tag(name = "Members", description = "멤버 관련 API")
@RestController
@RequiredArgsConstructor
@EnableWebMvc
@Slf4j
@RequestMapping("/api/members")
public class MemberController {

    private final JwtTokenProvider jwtTokenProvider;
    private final MemberService memberService;



    @Value("${oauth2.naver.state}")
    private String naverState;


    // 회원가입 또는 로그인
    @Operation(summary = "카카오로 로그인 및 회원가입", description = "카카오로 로그인 및 회원가입 하는 API")
    @PostMapping("/kakao/login")
    public ResponseEntity<LoginResponseDto> loginKakao(@RequestBody LoginRequestDto codeRequest) {
        LoginDto member = memberService.findKakaoMemberByAuthorizedCode(codeRequest.getCode(), RedirectUrlProperties.KAKAO_REDIRECT_URL);

        String accessToken = jwtTokenProvider.createAccessToken(member.getId(), member.getSocialId(), member.getSocialType());
        String refreshToken = jwtTokenProvider.createRefreshToken(member.getId());
        jwtTokenProvider.storeRefreshToken(member.getId(), refreshToken);

        return ResponseEntity.ok()
                .header("Authorization", accessToken)
                .header("Authorization-Refresh",refreshToken)
                .body(LoginResponseDto.builder()
                        .message("카카오 로그인을 성공하셨습니다")
                        .id(member.getId())
                        .nickname(member.getNickname())
                        .firstLogin(member.isFirstLogin())
                        .build());
    }

    @Operation(summary = "네이버로 로그인 및 회원가입", description = "네이버로 로그인 하는 API")
    @PostMapping("/naver/login")
    public ResponseEntity<LoginResponseDto> loginNaver(@RequestBody LoginRequestDto codeRequest) {
        LoginDto member = memberService.findNaverMemberByAuthorizedCode(codeRequest.getCode(), naverState);

        String accessToken = jwtTokenProvider.createAccessToken(member.getId(), member.getSocialId(),member.getSocialType());
        String refreshToken = jwtTokenProvider.createRefreshToken(member.getId());
        jwtTokenProvider.storeRefreshToken(member.getId(), refreshToken);

        return ResponseEntity.ok()
                .header("Authorization", accessToken)
                .header("Authorization-Refresh",refreshToken)
                .body(LoginResponseDto.builder()
                        .message("네이버 로그인을 성공하셨습니다")
                        .id(member.getId())
                        .nickname(member.getNickname())
                        .firstLogin(member.isFirstLogin())
                        .build());
    }


    @Operation(summary = "access&refresh 토큰 재발급", description = "access토큰 만료되면 refresh 토큰을 이용하여 재발급하는 API")
    @GetMapping("/reissue")
    public ResponseEntity<RefreshTokenResponseDto> reissue(HttpServletRequest httpServletRequest) {
        String refreshToken = httpServletRequest.getHeader("Authorization-Refresh");

        System.out.println("refreshToken = " + refreshToken);
        TokenDto tokenDto = memberService.reissue(refreshToken);


        return  ResponseEntity.ok()
                .header("Authorization", tokenDto.getAccessToken())
                .header("Authorization-Refresh",tokenDto.getRefreshToken())
                .body(RefreshTokenResponseDto.builder()
                        .message("accessToken 과 refreshToken이 재발급 성공하셨습니다")
                        .id(tokenDto.getId())
                        .build());
    }

    @Operation(summary = "멤버 정보 수정", description = "멤버 정보(프로필사진,닉네임) 수정")
    @PutMapping("/{id}")
    private BaseResponseDto updateMemberInfo(@PathVariable Integer id,
                                             @RequestPart(name = "nickname",required = false) MemberInfoUpdateRequestDto memberInfoUpdateRequestDto,
                                             @RequestParam(value = "file",required = false) MultipartFile file
            , HttpServletRequest httpServletRequest) {

        if (memberInfoUpdateRequestDto != null) {

            memberInfoUpdateRequestDto.setFile(file);
        }
        String token = httpServletRequest.getHeader("Authorization");
        Member findMember = memberService.findMemberByJwtToken(token);

        return memberService.updateMemberInfo(id,memberInfoUpdateRequestDto,findMember, file);
    }

    @Operation(summary = "닉네임 설정", description = "닉네임 설정")
    @PutMapping("/nickname")
    private BaseResponseDto setNickname(@RequestBody NicknameRequestDto nicknameRequestDto,
                                        HttpServletRequest httpServletRequest) {
        String token = httpServletRequest.getHeader("Authorization");
        if (token==null) return null;

        Member findMember = memberService.findMemberByJwtToken(token);

        return memberService.updateNickname(nicknameRequestDto.getNickname(),findMember);
    }

    @Operation(summary = "닉네임 중복 검사", description = "닉네임 중복 검사")
    @GetMapping("/nickname")
    public BaseResponseDto validNickname(@RequestParam("nickname") String nickname,
                                         HttpServletRequest httpServletRequest) {
        String token = httpServletRequest.getHeader("Authorization");
        if (token==null) return null;

        Member findMember = memberService.findMemberByJwtToken(token);

        return memberService.validNickname(nickname,findMember);
    }

    @Operation(summary = "회원 탈퇴", description = "회원 탈퇴")
    @PutMapping("/withdrawal")
    public BaseResponseDto withdrawal(HttpServletRequest httpServletRequest) {
        System.out.println("탈퇴");
        String token = httpServletRequest.getHeader("Authorization");
        if (token==null) return null;
        Member findMember = memberService.findMemberByJwtToken(token);
        System.out.println("탈퇴 돌아감");
        return memberService.deleteMember(findMember);
    }

    //마이페이지 사용자 정보 조회
    @Operation(summary = "마이페이지 사용자 정보 조회", description = "사용자 정보(닉네임,상테메세지,프로필사진경로)")
    @GetMapping("/getInfo")
    public MemberInfoResponseDto defaultMemberInfo(HttpServletRequest httpServletRequest) {

        String token = httpServletRequest.getHeader("Authorization");
        if (token == null) return null;

        Member findMember = memberService.findMemberByJwtToken(token);

        return memberService.getMemberInfo(findMember);

    }

    // 사용자 정보 전체 조회
    @Operation(summary = "사용자 정보 전체 조회", description = "사용자 정보 전체 조회")
    @GetMapping("/allGetInfo")
    public ResponseEntity<ResponseTemplate<MemberAllInfoResponse>> getAllMemberInfo(HttpServletRequest httpServletRequest){

        String token = httpServletRequest.getHeader("Authorization");
        if (token == null) return null;

        Member findMember = memberService.findMemberByJwtToken(token);

        MemberAllInfoResponse memberAllInfoResponse = memberService.getALlMemberInfo(findMember);

        return new ResponseEntity<>(
                ResponseTemplate.<MemberAllInfoResponse>builder()
                        .result(true)
                        .msg(MemberResponseMessage.MEMBER_GETALLMEMBER_SUCCESS.getMessage())
                        .data(memberAllInfoResponse)
                        .build(),
                HttpStatus.OK);
    }


    //mypage 조회(기록 페이지 상단 조회)
    @Operation(summary="기록 페이지 사용자 정보 조회", description="기록 페이지 사용자 정보 조회")
    @GetMapping("/info/{memberId}")
    public ResponseEntity<ResponseTemplate<MyPageMemberInfoResponse>> getMyPageMemberInfo(@PathVariable("memberId") int memberId,
                                                                                          HttpServletRequest httpServletRequest){
        String token = httpServletRequest.getHeader("Authorization");
        if (token == null) return null;
        Member findMember = memberService.findMemberByJwtToken(token);
        MyPageMemberInfoResponse myPageMemberInfoResponse = memberService.getMyPageMemberInfo(memberId);
        return new ResponseEntity<>(
          ResponseTemplate.<MyPageMemberInfoResponse>builder()
                  .result(true)
                  .msg(MemberResponseMessage.MEMBER_MYPAGE_INFO_SUCCESS.getMessage())
                  .data(myPageMemberInfoResponse)
                  .build(),HttpStatus.OK
        );
    }

    //기록 페이지(마이페이지) 독후감 불러오기
    @Operation(summary = "기록 페이지 독후감 조회", description = "기록 페이지(마이페이지)독후감 조회")
    @GetMapping("/record-list/{memberId}")
    public ResponseEntity<ResponseTemplate<MyPageRecordResponse>> getMyPageRecord(@PathVariable("memberId") int memberId,
                                                                                  HttpServletRequest httpServletRequest){
        String token = httpServletRequest.getHeader("Authorization");
        if (token == null) return null;
        Member findMember = memberService.findMemberByJwtToken(token);

        MyPageRecordResponse myPageRecordResponse = memberService.getMyPageRecord(memberId);
        return new ResponseEntity<>(
          ResponseTemplate.<MyPageRecordResponse>builder()
                  .result(true)
                  .msg(MemberResponseMessage.MEMBER_MYPAGE_RECORD_SUCCESS.getMessage())
                  .data(myPageRecordResponse)
                  .build(),HttpStatus.OK
        );
    }

    @Operation(summary = "기록 페이지 일기 조회", description = "기록 페이지(마이페이지) 일기 조회")
    @GetMapping("/diary-list")
    public ResponseEntity<ResponseTemplate<MyPageDiaryResponse>> getMyPageDiary(HttpServletRequest httpServletRequest){
        String token = httpServletRequest.getHeader("Authorization");
        if(token==null) return null;
        Member findMember = memberService.findMemberByJwtToken(token);
        MyPageDiaryResponse myPageDiaryResponse = memberService.getMyPageDiary(findMember);
        return new ResponseEntity<>(
                ResponseTemplate.<MyPageDiaryResponse>builder()
                        .result(true)
                        .msg(MemberResponseMessage.MEMBER_MYPAGE_DIARY_SUCCESS.getMessage())
                        .data(myPageDiaryResponse)
                        .build(),HttpStatus.OK
        );

    }




//    @GetMapping("/api/test")
//    public ResponseEntity<RefreshTokenResponseDto> tokenTest(HttpServletRequest httpServletRequest) {
//
//        String token = httpServletRequest.getHeader("Authorization");
//        if (token==null) return null;
//        Member findMember = memberService.findMemberByJwtToken(token);
//        return ResponseEntity.ok()
//                .body(RefreshTokenResponseDto.builder()
//                        .memberId(findMember.getMemberId())
//                        .message("Token 테스트 성공").build());
//    }


}
