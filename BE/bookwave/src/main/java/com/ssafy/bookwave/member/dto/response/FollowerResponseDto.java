package com.ssafy.bookwave.member.dto.response;

import lombok.Builder;

import java.util.List;

public class FollowerResponseDto {
    List<MemberResponseDto> follower;

    @Builder
    public FollowerResponseDto(List<MemberResponseDto> follower) {
        this.follower = follower;
    }
}
