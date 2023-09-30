package com.ssafy.bookwave.record.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RecordRegistRequestDto {

    private int memberId;
    private int bookId;
    private String title;
    private String content;
    private String startDate;
    private String endDate;
    private double star;

    //private MultipartFile file;

}