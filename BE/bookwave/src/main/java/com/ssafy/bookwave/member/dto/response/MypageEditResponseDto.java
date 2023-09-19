package com.ssafy.bookwave.member.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class MypageEditResponseDto {

    private final Integer MemberId;
    private final String nickname;
    private final String stMsg;
    private final String profileOriginalName;
    private final String profilePath;
    private final ShowInfoFlagsResponseDto showInfo;

}
