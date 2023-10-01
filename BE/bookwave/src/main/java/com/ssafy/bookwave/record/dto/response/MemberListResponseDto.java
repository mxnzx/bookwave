package com.ssafy.bookwave.record.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
public class MemberListResponseDto {

    List<MemberListResponseDto> memberList = new ArrayList<>();

    @Builder
    public MemberListResponseDto(List<MemberListResponseDto> memberList) {
        this.memberList = memberList;
    }
}
