package com.ssafy.bookwave.member.repository;

import com.ssafy.bookwave.member.domain.Member;
import com.ssafy.bookwave.member.domain.MemberGenre;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MemberGenreRepository extends JpaRepository<MemberGenre, Integer> {
    List<MemberGenre> findByMember(Member member);

    List<MemberGenre> findByMemberId(Integer id);
}
