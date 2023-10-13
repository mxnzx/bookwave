package com.ssafy.bookwave.diary.enums;

public enum DiaryResponseMessage {

    DIARY_REGIST_SUCCESS("다이어리 글 작성 성공"),
    DIARY_REGIST_ERROR("다이어리 글 작성 실패"),
    DIARY_DETAIL_SUCCESS("다이어리 상세보기 조회 성공"),
    DIARY_MODIFY_SUCCESS("다이어리 글 수정하기 성공"),
    DIARY_DELETE_SUCCESS("다이어리 글 삭제하기 성공");

    private final String message;


    DiaryResponseMessage(String message) {
        this.message = message;
    }

    public String getMessage(){
        return message;
    }
}
