package com.ssafy.bookwave.member.dto.response;

import com.ssafy.bookwave.member.domain.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;

@Getter
public class MemberUpdateResponseDto {

    private String nickname;
    private String profileImgPath;

    @Builder
    public MemberUpdateResponseDto(Member member) {
        this.nickname = member.getNickname();
        this.profileImgPath = member.getProfileImgPath();
    }
}
