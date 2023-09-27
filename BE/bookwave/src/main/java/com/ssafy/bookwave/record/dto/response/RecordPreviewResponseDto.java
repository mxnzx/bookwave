package com.ssafy.bookwave.record.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RecordPreviewResponseDto {
    private int recordId;
    private String recordMemberNickname;
    private String recordMemberProfileImageUrl;
    private String recordTitle;
    private String recordContent;
}
