package com.ssafy.bookwave.reminder.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class ReminderDetailResponseDto {

    private int reminderWriterMemberId;
    private String reminderWriterImageUrl;
    private String nickname;
    private int reminderId;
    private String bookTitle;
    private String author;
    private String content;
    private int page;
    @JsonProperty("isFollow")
    private boolean isFollow;


}
