package com.ssafy.bookwave.reminder.service;

import com.ssafy.bookwave.reminder.dto.request.ReminderDeleteRequestDto;
import com.ssafy.bookwave.reminder.dto.request.ReminderModifyRequestDto;
import com.ssafy.bookwave.reminder.dto.request.ReminderRegistRequestDto;
import com.ssafy.bookwave.reminder.dto.response.ReminderDetailResponseDto;

public interface ReminderService {

    void regist(ReminderRegistRequestDto reminderRegistRequest) throws Exception;

    ReminderDetailResponseDto getDetail(int memberId, int reminderId);

    void modify(ReminderModifyRequestDto reminderModifyRequest);

    void delete(ReminderDeleteRequestDto reminderDeleteRequest);
}
