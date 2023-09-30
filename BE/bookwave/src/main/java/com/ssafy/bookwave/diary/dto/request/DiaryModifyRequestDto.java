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

    private int memberId;
    private int DiaryId;
    private int bookId;
    private String content;
    private int page;
    private String color;
}
