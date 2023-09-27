package com.ssafy.bookwave.record.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RecordCommentRequest {

    private int recordId;
    private String content;
}
