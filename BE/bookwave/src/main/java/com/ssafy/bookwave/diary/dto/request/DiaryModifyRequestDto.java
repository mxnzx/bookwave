package com.ssafy.bookwave.diary.dto.request;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Data
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class DiaryModifyRequestDto {

    private int diaryId;
    private String content;
    private String color;

}
