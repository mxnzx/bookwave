package com.ssafy.bookwave.book.enums;

public enum BookshelfResponseMessage {

    BOOKSHELF_GETBOOKLIST_SUCCESS("책장 목록 불러오기 성공");

    private final String message;


    BookshelfResponseMessage(String message) {
        this.message = message;
    }

    public String getMessage(){
        return message;
    }
}
