package com.ssafy.bookwave.record.service;

import com.ssafy.bookwave.member.domain.Member;
import com.ssafy.bookwave.record.dto.request.RecordLikeRequest;
import com.ssafy.bookwave.record.dto.response.RecordLikeRegistResponseDto;


public interface RecordLikeService {

    RecordLikeRegistResponseDto changeLike(RecordLikeRequest recordLikeRequest, Member findMember);
}
