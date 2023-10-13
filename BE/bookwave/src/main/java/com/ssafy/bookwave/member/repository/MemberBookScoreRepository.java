package com.ssafy.bookwave.member.repository;

import com.ssafy.bookwave.member.domain.MemberBookScore;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MemberBookScoreRepository extends JpaRepository<MemberBookScore, Integer> {

    // 회원별 도서 평점 평균을 계산하는 메서드
    @Query("SELECT AVG(s.score) FROM MemberBookScore s WHERE s.book.id = :bookId")
    Double getAverageScoreByMemberId(@Param("bookId") Integer bookId);

    @Query("SELECT AVG(m.score) FROM MemberBookScore m WHERE m.book.id = :bookId")
    Double findAverageScoreByBookId(@Param("bookId") Integer bookId);

}
