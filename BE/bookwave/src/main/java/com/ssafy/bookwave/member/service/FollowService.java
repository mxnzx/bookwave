package com.ssafy.bookwave.member.service;

import com.ssafy.bookwave.member.dto.request.FollowSaveRequestDto;
import com.ssafy.bookwave.member.dto.response.BaseResponseDto;
import com.ssafy.bookwave.member.dto.response.FollowerPageResponseDto;
import com.ssafy.bookwave.member.dto.response.FollowingPageResponseDto;

public interface FollowService {
    FollowerPageResponseDto getFollowers(int memberId, int i, int size);

    FollowingPageResponseDto getFollowings(int memberId, int i, int size);

    BaseResponseDto enrollFollow(int followerId, FollowSaveRequestDto followSaveRequestDto);

    BaseResponseDto deleteFollow(int followingId, int followerId);

    BaseResponseDto checkFollowStatus(int followingId, int followerId);
}
