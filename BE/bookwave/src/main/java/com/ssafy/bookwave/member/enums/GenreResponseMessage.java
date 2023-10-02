package com.ssafy.bookwave.member.enums;

public enum GenreResponseMessage {

    GENRE_GETLIST_SUCCESS("장르 전체 리스트 불러오기 성공"),
    GENRE_GEGIST_SUCCESS("선호 장르 등록 성공"),
    GENRE_GET_SUCCESS("기존에 등록한 선호 장르 불러오기 성공");

    private final String message;


    GenreResponseMessage(String message) {
        this.message = message;
    }

    public String getMessage(){
        return message;
    }
}
