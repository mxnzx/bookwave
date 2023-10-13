package com.ssafy.bookwave.record.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class MemberResponseDto {

    private int memberId;
    private int bbtiTypeId;
    private String nickname;
    private String imageUrl;

    @Builder
    public MemberResponseDto(int memberId, int bbtiTypeId, String nickname, String imageUrl) {
        this.memberId = memberId;
        this.bbtiTypeId = bbtiTypeId;
        this.nickname = nickname;
        this.imageUrl = imageUrl;
    }
}
