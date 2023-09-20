package com.ssafy.bookwave.member.repository;

import com.ssafy.bookwave.member.domain.Follow;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FollowRepository extends JpaRepository<Follow, Integer> {
    Follow findByFollowerId(Integer id);

    List<Follow> findByFollowingId(Integer id);
}
