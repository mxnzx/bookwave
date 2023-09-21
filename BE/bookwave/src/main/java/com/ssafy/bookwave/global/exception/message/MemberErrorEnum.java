package com.ssafy.bookwave.global.exception.message;

import lombok.Getter;

@Getter
public enum MemberErrorEnum {
    INVALID_MEMBER(2000, "잘못된 사용자입니다. memberId: ");

    private final int code;
    private final String message;

    MemberErrorEnum(int code, String message) {
        this.code = code;
        this.message = message;
    }
}