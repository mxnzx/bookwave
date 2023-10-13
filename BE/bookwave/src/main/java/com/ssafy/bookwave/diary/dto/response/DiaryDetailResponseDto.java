package com.ssafy.bookwave.diary.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@Builder
public class DiaryDetailResponseDto {

    private int diaryWriterMemberId;
    private String memberNickname;
    private String memberProfileUrl;
    private int diaryId;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDateTime diaryDate;
    private String diaryContent;
    private String diaryColor;
    private Integer todayBookId;
    private String todayBookTitle;
    private String todayBookAuthor;
    private String todayBookImgUrl;


}
