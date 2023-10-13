package com.ssafy.bookwave.reminder.enums;

public enum ReminderResponseMessage {

    REMINDER_REGIST_SUCCESS("리마인더 글 작성 성공"),
    REMINDER_REGIST_ERROR("리마인더 글 작성 실패"),
    REMINDER_DETAIL_SUCCESS("리마인더 상세보기 조회 성공"),
    REMINDER_MODIFY_SUCCESS("리마인더 글 수정하기 성공"),
    REMINDER_DELETE_SUCCESS("리마인더 글 삭제하기 성공");

    private final String message;


    ReminderResponseMessage(String message) {
        this.message = message;
    }

    public String getMessage(){
        return message;
    }
}
