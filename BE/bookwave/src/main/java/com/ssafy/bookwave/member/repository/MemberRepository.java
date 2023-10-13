package com.ssafy.bookwave.member.repository;

import com.ssafy.bookwave.member.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Integer> {
    Optional<Member> findBySocialId(String socialId);

    Optional<Member> findByNickname(String nickname);

    List<Member> findByBbtiTypeId(int bbtiType);

//    Page<Member> findByNicknameStartingWithOrderByNickname(String nickname, Pageable pageable);
//
//    Optional<Member> findByEmail(String email);
//
//    Optional<Member> findBySocialId(String socialId);
//
//    Optional<Member> findByEmailAndSocialType(String email, SocialType socialType);


}
