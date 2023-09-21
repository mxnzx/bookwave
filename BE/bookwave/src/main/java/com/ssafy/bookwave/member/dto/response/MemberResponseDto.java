package com.ssafy.bookwave.member.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class MemberResponseDto {

    private Integer memberId;
    private String email;
    private String nickname;;
    private String profileImgPath;

}
