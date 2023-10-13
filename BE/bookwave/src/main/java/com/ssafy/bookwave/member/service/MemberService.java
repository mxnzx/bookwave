package com.ssafy.bookwave.member.service;

import com.ssafy.bookwave.member.domain.Member;
import com.ssafy.bookwave.member.dto.LoginDto;
import com.ssafy.bookwave.member.dto.TokenDto;
import com.ssafy.bookwave.member.dto.request.MemberDeleteRequestDto;
import com.ssafy.bookwave.member.dto.request.MemberInfoUpdateRequestDto;
import com.ssafy.bookwave.member.dto.response.*;
import org.springframework.web.multipart.MultipartFile;

public interface MemberService {
    LoginDto findKakaoMemberByAuthorizedCode(String code, String kakaoRedirectUrl);

    LoginDto findNaverMemberByAuthorizedCode(String code, String naverState);

    TokenDto reissue(String refreshToken);

    Member findMemberByJwtToken(String token);

    BaseResponseDto updateMemberInfo(Integer memberId, MemberInfoUpdateRequestDto memberInfoUpdateRequestDto, Member findMember, MultipartFile file);

    BaseResponseDto updateNickname(String nickname, Member findMember);

    BaseResponseDto validNickname(String nickname, Member findMember);

    BaseResponseDto deleteMember(Member findMember);

    MemberInfoResponseDto getMemberInfo(Member findMember);

    MemberAllInfoResponse getALlMemberInfo(Member findMember);

    MyPageMemberInfoResponse getMyPageMemberInfo(int memberId);

    MyPageRecordResponse getMyPageRecord(int memberId);

    MyPageDiaryResponse getMyPageDiary(Member findMember);
}
