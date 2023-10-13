package com.ssafy.bookwave.record.enums;

public enum RecordResponseMessage {

    RECORD_BOOKSHELF_SUCCESS("레코드 글 작성 시 나의 책장 정보 불러오기 성공"),
    RECORD_WRITERECORDBOOK_SUCCESS("레코드 글 등록 시 책 정보 불러오기 성공"),
    RECORD_REGIST_SUCCESS("레코드 글 작성 성공"),
    RECORD_MODIFY_SUCCESS("레코드 글 수정 성공"),
    RECORD_MODIFY_INFO_SUCCESS("레코드 글 수정 시 정보 불러오기 성공"),
    RECORD_DELETE_SUCCESS("레코드 삭제 성공"),
    RECORD_LIKE_SUCCESS("레코드 좋아요 상태변경 성공"),
    RECORD_REGIST_COMMENT_SUCCESS("레코드 댓글 작성 성공"),
    RECORD_DELETE_COMMENT_SUCCESS("레코드 댓글 삭제 성공"),
    RECORD_RECORDDETAIL_SUCCESS("레코드 상세보기 성공");
    private final String message;


    RecordResponseMessage(String message) {
        this.message = message;
    }

    public String getMessage(){
        return message;
    }
}
