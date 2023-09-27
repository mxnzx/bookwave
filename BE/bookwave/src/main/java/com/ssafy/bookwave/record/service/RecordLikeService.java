package com.ssafy.bookwave.record.service;

import com.ssafy.bookwave.member.domain.Member;
import com.ssafy.bookwave.record.dto.request.RecordLikeRequest;


public interface RecordLikeService {

    void changeLike(RecordLikeRequest recordLikeRequest, Member findMember);
}
