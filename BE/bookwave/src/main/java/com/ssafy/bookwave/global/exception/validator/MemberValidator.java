package com.ssafy.bookwave.global.exception.validator;

import com.ssafy.bookwave.global.exception.CustomException;
import com.ssafy.bookwave.global.exception.message.FollowErrorEnum;
import com.ssafy.bookwave.global.exception.message.MemberErrorEnum;
import com.ssafy.bookwave.member.domain.Member;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import java.util.Optional;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
@Component
public class MemberValidator {

    public void checkMember(Optional<Member> member, int memberId) {
        if (member.isEmpty()) {
            throw CustomException.builder()
                    .status(HttpStatus.BAD_REQUEST)
                    .code(MemberErrorEnum.INVALID_MEMBER.getCode())
                    .message(MemberErrorEnum.INVALID_MEMBER.getMessage() + memberId)
                    .build();
        }
    }

    /**
     * 두 사용자가 동일한 사용자인지 검사하여 동일하다면 에러를 발생시키는 메서드
     * @param followerId 팔로우하는 사용자의 memberId
     * @param followingId 팔로우되는 사용자의 memberId
     */
    public void checkDifferentMembers(int followerId, int followingId) {
        if (followerId == followingId) {
            throw CustomException.builder()
                    .status(HttpStatus.BAD_REQUEST)
                    .code(FollowErrorEnum.SAME_MEMBERS.getCode())
                    .message(FollowErrorEnum.SAME_MEMBERS.getMessage())
                    .build();
        }
    }
}