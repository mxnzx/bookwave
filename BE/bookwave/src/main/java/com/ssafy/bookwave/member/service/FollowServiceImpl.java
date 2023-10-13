package com.ssafy.bookwave.member.service;

import com.ssafy.bookwave.global.exception.validator.BaseValidator;
import com.ssafy.bookwave.global.exception.validator.MemberValidator;
import com.ssafy.bookwave.global.exception.validator.FollowValidator;
import com.ssafy.bookwave.member.domain.Follow;
import com.ssafy.bookwave.member.domain.Member;
import com.ssafy.bookwave.member.dto.request.FollowSaveRequestDto;
import com.ssafy.bookwave.member.dto.response.*;
import com.ssafy.bookwave.member.enums.FollowResponseEnum;
import com.ssafy.bookwave.member.repository.FollowRepository;
import com.ssafy.bookwave.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Service
public class FollowServiceImpl implements FollowService {
    private final FollowRepository followRepository;
    private final MemberRepository memberRepository;

    private final FollowValidator followValidator;
    private final MemberValidator memberValidator;
    private final BaseValidator baseValidator;

    /**
     * 특정 사용자를 팔로우하고 있는 사용자 정보 목록을 반환하는 메서드
     *
     * @param id 팔로워 목록 조회를 요청하는 사용자 아이디
     * @param page     페이지 번호
     * @param size     페이지 당 조회할 팔로워 수
     * @return 요청자를 팔로우하고 있는 사용자 정보 목록
     */
    public FollowerPageResponseDto getFollowers(int id, int page, int size) {
        baseValidator.checkPageAndSize(page, size);
        Member member = getMember(id);

        Pageable pageable = PageRequest.of(page, size);
        Page<Follow> followPage = followRepository.findAllByFollowerId(member.getId(), pageable);
        List<MemberResponseDto> followers = getFollowerList(followPage);

        return FollowerPageResponseDto.builder()
                .totalPages(followPage.getTotalPages())
                .totalFollowers((int) followPage.getTotalElements())
                .followers(followers)
                .build();
    }

    /**
     * 특정 사용자가 팔로우하고 있는 사용자 정보 목록을 반환하는 메서드
     *
     * @param id 팔로잉 목록 조회를 요청하는 사용자 아이디
     * @param page     페이지 번호
     * @param size     페이지 당 조회할 팔로워 수
     * @return 요청자가 팔로우하고 있는 사용자 정보 목록
     */
    public FollowingPageResponseDto getFollowings(int id, int page, int size) {
        baseValidator.checkPageAndSize(page, size);
        Member member = getMember(id);

        Pageable pageable = PageRequest.of(page, size);

        Page<Follow> followPage = followRepository.findAllByFollowingId(member.getId(), pageable);

        List<MemberResponseDto> followings = getFollowingList(followPage);

        return FollowingPageResponseDto.builder()
                .totalPages(followPage.getTotalPages())
                .totalFollowings((int) followPage.getTotalElements())
                .followings(followings)
                .build();
    }

    /**
     * 팔로우를 등록하는 메서드
     *
     * @param followingId           팔로우 신청자 아이디
     * @param followSaveRequestDto 팔로우 할 대상의 memberId를 담는 Dto
     * @return 팔로우 정상 등록 시 followId, followerId, followingId를 리턴, 에러 시 에러코드와 메세지 리턴
     */
    @Transactional
    public BaseResponseDto enrollFollow(int followingId, FollowSaveRequestDto followSaveRequestDto) {
        memberValidator.checkDifferentMembers(followingId, followSaveRequestDto.getFollowerId());

        Member following = getMember(followingId); // 나
        Member follower = getMember(followSaveRequestDto.getFollowerId()); // 내가 팔로우 하는 상대방

        followValidator.checkFollowNotExist(followRepository, follower, following);

        int followId = saveFollow(follower,following);

        return BaseResponseDto.builder()
                .success(true)
                .message(FollowResponseEnum.SUCCESS_ENROLL_FOLLOW.getName())
                .data(FollowResponseDto.builder()
                        .followId(followId)
                        .followerId(followSaveRequestDto.getFollowerId())
                        .followingId(followingId)
                        .build())
                .build();
    }

    /**
     * 팔로우를 취소하는 메서드
     *
     * @param followingId 팔로우 취소를 요청하는 사용자 아이디
     * @param followerId 팔로우 취소 대상의 memberId
     * @return 팔로우 정상 취소 시 취소된 followId, followerId, followingId를 리턴, 에러 시 에러코드와 메세지 리턴
     */
    @Transactional
    public BaseResponseDto deleteFollow(int followingId, int followerId) {
        memberValidator.checkDifferentMembers(followingId, followerId);

        Member following = getMember(followingId);
        Member follower = getMember(followerId);

        Follow follow = followValidator.checkFollowExist(followRepository, follower, following);
        followRepository.delete(follow);

        return BaseResponseDto.builder()
                .success(true)
                .message(FollowResponseEnum.SUCCESS_DELETE_FOLLOW.getName())
                .data(FollowResponseDto.builder()
                        .followId(follow.getId())
                        .followerId(followerId)
                        .followingId(followingId)
                        .build())
                .build();
    }

    /**
     * 두 사용자가 팔로우 상태인지 확인하는 메소드
     *
     * @param followingId 로그인 된 사용자
     * @param followerId 팔로우 상태를 확인하고자 하는 사용자
     * @return 팔로우 상태를 true, false로 리턴
     */
    public BaseResponseDto checkFollowStatus(int followingId, int followerId) {
        memberValidator.checkDifferentMembers(followingId, followerId);

        Member following = getMember(followingId);
        Member follower = getMember(followerId);
        Optional<Follow> follow = followRepository.findByFollowerAndFollowing(follower, following);

        if (follow.isPresent()) {
            return getFollowStatusResponse(FollowResponseEnum.FOLLOW_STATUS_TRUE.getName(), true);
        } else {
            return getFollowStatusResponse(FollowResponseEnum.FOLLOW_STATUS_FALSE.getName(), false);
        }
    }

    @Transactional
    public int saveFollow(Member follower, Member following) {
        Follow follow = Follow.builder()
                .follower(follower)
                .following(following)
                .build();

        followRepository.save(follow);

        return follow.getId();
    }

    private Member getMember(int id) {
        Optional<Member> member = memberRepository.findById(id);
        memberValidator.checkMember(member, id);
        return member.get();
    }

    private List<MemberResponseDto> getFollowerList(Page<Follow> followPage) {
        return followPage.getContent().stream()
                .map(follow ->
                        MemberResponseDto.builder()
                                .memberId(follow.getFollowing().getId())
                                .email(follow.getFollowing().getEmail())
                                .nickname(follow.getFollowing().getNickname())
                                .profileImgPath(follow.getFollowing().getProfileImgPath())
                                .build())
                .collect(Collectors.toList());
    }

    private List<MemberResponseDto> getFollowingList(Page<Follow> followPage) {
        return followPage.getContent().stream()
                .map(follow ->
                        MemberResponseDto.builder()
                                .memberId(follow.getFollower().getId())
                                .email(follow.getFollower().getEmail())
                                .nickname(follow.getFollower().getNickname())
                                .profileImgPath(follow.getFollower().getProfileImgPath())
                                .build())
                .collect(Collectors.toList());
    }

    private BaseResponseDto getFollowStatusResponse(String message, boolean success) {
        return BaseResponseDto.builder()
                .success(true)
                .message(message)
                .data(success)
                .build();
    }
}
