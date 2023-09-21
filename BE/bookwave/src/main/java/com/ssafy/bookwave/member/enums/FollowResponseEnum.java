package com.ssafy.bookwave.member.enums;

import lombok.Getter;

@Getter
public enum FollowResponseEnum {
    SUCCESS_ENROLL_FOLLOW("팔로우 등록에 성공했습니다."),
    SUCCESS_DELETE_FOLLOW("팔로우가 정상적으로 취소되었습니다."),
    FOLLOW_STATUS_TRUE("팔로우 되어있는 상태입니다."),
    FOLLOW_STATUS_FALSE("팔로우 되어있지 않은 상태입니다.");

    private final String name;

    FollowResponseEnum(String name) {
        this.name = name;
    }
}
