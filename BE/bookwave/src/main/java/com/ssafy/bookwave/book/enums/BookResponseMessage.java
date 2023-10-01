package com.ssafy.bookwave.book.enums;

public enum BookResponseMessage {

    BOOK_GETBOOKDETAIL_SUCCESS("도서 상세 불러오기 성공"),
    BOOK_CHANGEBOOKSTATE_SUCCCESS("도서 상태 변경 성공"),
    BOOK_SEARCHBYKEYWORD_SUCCESS("도서 키워드로 검색 성공");

    private final String message;


    BookResponseMessage(String message) {
        this.message = message;
    }

    public String getMessage(){
        return message;
    }
}
