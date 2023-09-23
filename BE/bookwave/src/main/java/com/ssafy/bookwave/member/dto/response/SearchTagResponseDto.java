package com.ssafy.bookwave.member.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Builder
@Getter
public class SearchTagResponseDto {
    private int tagId;
    private String content;
}
