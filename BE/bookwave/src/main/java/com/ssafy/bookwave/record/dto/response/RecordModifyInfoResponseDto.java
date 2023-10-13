package com.ssafy.bookwave.record.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class RecordModifyInfoResponseDto {

    private String bookImageUrl;
    private String bookTitle;
    private String bookAuthor;
    private String recordImageUrl;
    private double score;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDateTime startDate;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDateTime endDate;
    private String recordTitle;
    private String recordContent;
    private int recordWriterMemberId;

}
