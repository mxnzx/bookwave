package com.ssafy.bookwave.global.exception.message;

import lombok.Getter;

@Getter
public enum FollowErrorEnum {
    EXIST_FOLLOW_STATUS(1000, "이미 팔로우 된 상태입니다."),
    NOT_EXIST_FOLLOW_STATUS(1001, "이미 팔로우 되지 않은 상태입니다."),
    SAME_MEMBERS(1002, "팔로우 신청자와 대상자가 동일합니다.");

    private final int code;
    private final String message;

    FollowErrorEnum(int code, String message) {
        this.code = code;
        this.message = message;
    }
}
