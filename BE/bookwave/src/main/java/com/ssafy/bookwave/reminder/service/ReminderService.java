package com.ssafy.bookwave.reminder.service;

import com.ssafy.bookwave.reminder.dto.request.ReminderRegistRequest;
import com.ssafy.bookwave.reminder.dto.response.ReminderDetailResponse;

public interface ReminderService {

    void regist(ReminderRegistRequest reminderRegistRequest) throws Exception;

    ReminderDetailResponse getDetail(int memberId, int reminderId);
}
