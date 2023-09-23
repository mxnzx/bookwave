package com.ssafy.bookwave.record.enums;

public enum RecordResponseMessage {

    RECORD_BOOKSHELF_SUCCESS("레코드 글 작성 시 나의 책장 정보 불러오기 성공");
    private final String message;


    RecordResponseMessage(String message) {
        this.message = message;
    }

    public String getMessage(){
        return message;
    }
}
