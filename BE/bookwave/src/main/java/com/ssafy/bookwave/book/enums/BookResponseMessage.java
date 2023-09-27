package com.ssafy.bookwave.book.enums;

public enum BookResponseMessage {

    BOOK_GETBOOKDETAIL_SUCCESS("도서 상세 불러오기 성공");

    private final String message;


    BookResponseMessage(String message) {
        this.message = message;
    }

    public String getMessage(){
        return message;
    }
}
