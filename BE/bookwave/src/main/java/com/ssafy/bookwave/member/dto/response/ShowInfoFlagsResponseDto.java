package com.ssafy.bookwave.member.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class ShowInfoFlagsResponseDto {

    private Integer memberId;
    private byte goalFlag;
    private byte oneDiaryFlag;
    private byte wishListFlag;
    private byte routineHistoryFlag;
    private byte ddayFlag;
    private byte galleryFlag;
}
