package com.ssafy.bookwave.member.dto.response;

import com.ssafy.bookwave.member.domain.Member;
import com.ssafy.bookwave.member.enums.Gender;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;

@Getter
public class MemberInfoResponseDto {

    private Integer id;
    private String email;
    private String nickname;
    private Gender gender;
    private String profileImgPath;

    @Builder
    public MemberInfoResponseDto(Member member) {
        this.id = member.getId();
        this.email = member.getEmail();
        this.nickname = member.getNickname();
        this.gender = member.getGender();
        this.profileImgPath = member.getProfileImgPath();
    }
}
