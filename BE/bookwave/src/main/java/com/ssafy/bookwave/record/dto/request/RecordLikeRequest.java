package com.ssafy.bookwave.record.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class RecordLikeRequest {

    private int recordId;
}
