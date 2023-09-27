package com.ssafy.bookwave.member.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MyPageMemberInfoResponse {
    private Integer memberId;
    private String nickname;
    private Integer followerCnt;
    private Integer followingCnt;
    private String profileImgPath;
}
