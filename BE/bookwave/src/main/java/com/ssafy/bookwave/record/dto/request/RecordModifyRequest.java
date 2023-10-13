package com.ssafy.bookwave.record.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RecordModifyRequest {

    private int recordId;
    private String bookImageUrl;
    private String recordImageUrl;
    private String title;
    private String content;
    private String startDate;
    private String endDate;
    private double star;

    private MultipartFile file;
}
