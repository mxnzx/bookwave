package com.ssafy.bookwave.record.dto.response;

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
