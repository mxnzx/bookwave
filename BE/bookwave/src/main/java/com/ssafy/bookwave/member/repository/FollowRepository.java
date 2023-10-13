package com.ssafy.bookwave.member.repository;

import com.ssafy.bookwave.member.domain.Follow;
import com.ssafy.bookwave.member.domain.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FollowRepository extends JpaRepository<Follow, Integer> {
    Follow findByFollowerId(Integer id);

    List<Follow> findByFollowingId(Integer id);

    // 내가 팔로우 하는 사람
    Page<Follow> findAllByFollowingId(Integer id, Pageable pageable);

    // 나를 팔로우 하는 사람
    Page<Follow> findAllByFollowerId(Integer id, Pageable pageable);

    Optional<Follow> findByFollowerAndFollowing(Member follower, Member following);


}
