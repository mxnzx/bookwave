package com.ssafy.bookwave.record.service;

import com.ssafy.bookwave.book.dto.response.BookBookshelfResponseDto;
import com.ssafy.bookwave.member.domain.Member;
import com.ssafy.bookwave.member.dto.response.BaseResponseDto;
import com.ssafy.bookwave.record.dto.request.RecordBookshelfResponseDto;
import com.ssafy.bookwave.record.dto.request.RecordCommentRequest;
import com.ssafy.bookwave.record.dto.request.RecordModifyRequest;
import com.ssafy.bookwave.record.dto.request.RecordRegistRequestDto;
import com.ssafy.bookwave.record.dto.response.RecordDetailResponseDto;
import com.ssafy.bookwave.record.dto.response.RecordModifyInfoResponseDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface RecordService {

    RecordBookshelfResponseDto getBookshelf(int memberId);

    BookBookshelfResponseDto getWriteRecordBook(int memberId, int bookId);

    void registRecord(RecordRegistRequestDto recordRegistRequest, MultipartFile recordPicture, Member findMember) throws IOException;

    RecordDetailResponseDto getRecordDetail(int recordId, Member findMember);

    void modifyRecord(RecordModifyRequest recordModifyRequest, MultipartFile recordPicture, Member findMember) throws IOException;

    void deleteRecord(int recordId, Member findMember);

    void registRecordComment(RecordCommentRequest recordCommentRequest, Member findMember);

    RecordModifyInfoResponseDto getModifyInfo(int recordId, Member findMember);

    void deleteComment(int commentId, Member findMember);

    void deleteAllComments(int recordId, Member findMember);

    void deleteAllLike(int recordId, Member findMember);

    BaseResponseDto getFidList(int memberId, Member findMember);

    void calScore(RecordRegistRequestDto recordRegistRequest, Member findMember);

    BaseResponseDto getFidMemberList(Member findMember);
}
