package com.ssafy.bookwave.member.dto.response;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
public class FollowerPageResponseDto {
    private int totalPages;
    private int totalFollowers;
    private List<MemberResponseDto> followers;
}
