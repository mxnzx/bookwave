package com.ssafy.bookwave.member.dto.response;

import com.ssafy.bookwave.bbti.dto.response.BbtiResponseDto;
import com.ssafy.bookwave.member.enums.SocialType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class MemberAllInfoResponse {

    private int id;
    private int bbtiType;
    private String email;
    private String nickname;
    private String gender;
    private String profileImgName;
    private String profileImgPath;
    private String SocialId;
    private SocialType socialType;
    private String role;

    @Builder
    public MemberAllInfoResponse(int id, int bbtiType, String email, String nickname, String gender, String profileImgName, String profileImgPath, String socialId, SocialType socialType, String role) {
        this.id = id;
        this.bbtiType = bbtiType;
        this.email = email;
        this.nickname = nickname;
        this.gender = gender;
        this.profileImgName = profileImgName;
        this.profileImgPath = profileImgPath;
        this.SocialId = socialId;
        this.socialType = socialType;
        this.role = role;
    }
}
