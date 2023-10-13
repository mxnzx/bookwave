package com.ssafy.bookwave.diary.service;

import com.ssafy.bookwave.diary.dto.request.DiaryDeleteRequestDto;
import com.ssafy.bookwave.diary.dto.request.DiaryModifyRequestDto;
import com.ssafy.bookwave.diary.dto.request.DiaryRegistRequestDto;
import com.ssafy.bookwave.diary.dto.response.DiaryDetailResponseDto;
import com.ssafy.bookwave.member.domain.Member;

public interface DiaryService {

    void regist(Member member, DiaryRegistRequestDto diaryRegistRequestdto);

    DiaryDetailResponseDto getDetail(int memberId, int diaryId);

    void modify(DiaryModifyRequestDto diaryModifyRequest);

    void delete(int diaryId);
}
