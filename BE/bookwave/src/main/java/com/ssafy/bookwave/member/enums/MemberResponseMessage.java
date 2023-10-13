package com.ssafy.bookwave.member.enums;

public enum MemberResponseMessage {

    MEMBER_GETALLMEMBER_SUCCESS("회원 모든 정보 조회 성공"),
    MEMBER_MYPAGE_INFO_SUCCESS("기록 페이지 회원 정보 조회 성공"),
    MEMBER_MYPAGE_RECORD_SUCCESS("기록 페이지 회원 독후감 조회 성공"),
    MEMBER_MYPAGE_DIARY_SUCCESS("기록 페이지 회원 일기 조회 성공");
    private final String message;


    MemberResponseMessage(String message) {
        this.message = message;
    }

    public String getMessage(){
        return message;
    }

}
