package com.ssafy.bookwave.record.dto.response;

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

    private int memberId;
    private int recordId;
}
