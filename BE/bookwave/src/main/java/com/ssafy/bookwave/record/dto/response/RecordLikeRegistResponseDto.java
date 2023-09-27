package com.ssafy.bookwave.record.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.bookwave.member.dto.response.MemberAllInfoResponse;
import com.ssafy.bookwave.member.dto.response.MemberInfoResponseDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class RecordLikeRegistResponseDto {

    @JsonProperty("isLIke")
    private boolean isLike;
}
