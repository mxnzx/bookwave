package com.ssafy.bookwave.recommend.enums;

public enum RecommendResponseMessage {
    RECENT_RECOMMEND_SUCCESS("최근 읽은 책과 비슷한 장르 리스트 조회 완료"),
    GENRE_RECOMMEND_SUCCESS("선호하는 장르 기반 추천 완료"),
    BBTI_RECOMMEND_SUCCESS("BBTI 기반 추천 완료"),
    MOOD_RECOMMEND_SUCCESS("감정 기반 추천 완료"),
    TODAY_RECOMMEND_SUCCESS("오늘의 책 추천 완료");


    private final String message;

    RecommendResponseMessage(String message){this.message = message;}

    public String getMessage(){return message;}
}
