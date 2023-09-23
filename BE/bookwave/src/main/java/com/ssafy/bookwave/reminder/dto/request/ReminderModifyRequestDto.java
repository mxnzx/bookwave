package com.ssafy.bookwave.reminder.dto.request;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Data
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ReminderModifyRequestDto {

    private int memberId;
    private int reminderId;
    private int bookId;
    private String content;
    private int page;
    private String color;
}
