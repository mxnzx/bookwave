package com.ssafy.bookwave.global.exception.validator;

import com.ssafy.bookwave.global.exception.CustomException;
import com.ssafy.bookwave.global.exception.message.FollowErrorEnum;
import com.ssafy.bookwave.member.domain.Follow;
import com.ssafy.bookwave.member.domain.Member;
import com.ssafy.bookwave.member.repository.FollowRepository;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import java.util.Optional;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
@Component
public class FollowValidator {

    public void checkFollowNotExist(FollowRepository followRepository, Member follower, Member following) {
        Optional<Follow> follow = followRepository.findByFollowerAndFollowing(follower, following);
        if (follow.isPresent()) {
            throw CustomException.builder()
                    .status(HttpStatus.BAD_REQUEST)
                    .code(FollowErrorEnum.EXIST_FOLLOW_STATUS.getCode())
                    .message(FollowErrorEnum.EXIST_FOLLOW_STATUS.getMessage())
                    .build();
        }
    }

    public Follow checkFollowExist(FollowRepository followRepository, Member follower, Member following) {
        Optional<Follow> follow = followRepository.findByFollowerAndFollowing(follower, following);
        if (follow.isEmpty()) {
            throw CustomException.builder()
                    .status(HttpStatus.BAD_REQUEST)
                    .code(FollowErrorEnum.NOT_EXIST_FOLLOW_STATUS.getCode())
                    .message(FollowErrorEnum.NOT_EXIST_FOLLOW_STATUS.getMessage())
                    .build();
        }

        return follow.get();
    }
}
