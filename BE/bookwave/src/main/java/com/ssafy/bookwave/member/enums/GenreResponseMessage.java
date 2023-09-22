package com.ssafy.bookwave.member.enums;

public enum GenreResponseMessage {

    GENRE_GETLIST_SUCCESS("장르 전체 리스트 불러오기 성공");
    private final String message;


    GenreResponseMessage(String message) {
        this.message = message;
    }

    public String getMessage(){
        return message;
    }
}
