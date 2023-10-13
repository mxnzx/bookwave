package com.ssafy.bookwave.member.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.cglib.core.Local;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MyPageDiaryDto {
    private Integer diaryId;
    private String diaryContent;
    private String diaryColor;
    private String diaryDate;

    public void setDiaryDate(LocalDateTime diaryDate){
        this.diaryDate = diaryDate.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
    }
}
