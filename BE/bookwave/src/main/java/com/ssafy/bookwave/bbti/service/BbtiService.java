package com.ssafy.bookwave.bbti.service;

import com.ssafy.bookwave.bbti.dto.request.BbtiRequestDto;
import com.ssafy.bookwave.bbti.dto.response.BbtiQuestionResponseDto;
import com.ssafy.bookwave.member.dto.response.BaseResponseDto;

import java.util.List;

public interface BbtiService {

    BaseResponseDto getBbtiQuesiton();

    BaseResponseDto registBbti(int memberId, List<String> bbtiList);
}
