package com.ssafy.bookwave.member.repository;

import com.ssafy.bookwave.member.domain.Member;
import com.ssafy.bookwave.member.domain.MemberGenre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MemberGenreRepository extends JpaRepository<MemberGenre, Integer> {
    List<MemberGenre> findByMember(Member member);

    List<MemberGenre> findByMemberId(Integer id);

    @Query("SELECT gdd.id FROM MemberGenre mg " +
            "JOIN mg.genreDict gd " +
            "JOIN gd.genreDetailDicts gdd " +
            "WHERE mg.member.id = :memberId")
    List<Integer> findDetailDictIdsByMemberId(@Param("memberId") Integer memberId);
}
