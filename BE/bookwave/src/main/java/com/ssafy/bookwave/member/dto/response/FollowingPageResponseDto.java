package com.ssafy.bookwave.member.dto.response;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
public class FollowingPageResponseDto {
    private int totalPages;
    private int totalFollowings;
    private List<MemberResponseDto> followings;
}
