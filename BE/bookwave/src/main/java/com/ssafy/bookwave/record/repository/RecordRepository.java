package com.ssafy.bookwave.record.repository;

import com.ssafy.bookwave.member.domain.Member;
import com.ssafy.bookwave.record.domain.Record;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RecordRepository extends JpaRepository<Record, Integer> {

    void deleteById(int recordId);
    List<Record> findByBookId(int bookId);
    List<Record> findByMemberId(int memberId);
    List<Record> findByMemberIdIn(List<Integer> memberId);
    @Query("SELECT r.id FROM Member m JOIN m.records r WHERE m.bbtiType.id = (SELECT mem.bbtiType.id FROM Member mem WHERE mem.id = :memberId)")
    List<Integer> findRecordIdsBySameBbtiTypeId(@Param("memberId") Integer memberId);

    @Query("SELECT r FROM Member m JOIN m.records r WHERE m.bbtiType.id = (SELECT mem.bbtiType.id FROM Member mem WHERE mem.id = :memberId) ORDER BY function('RAND')")
    Page<Record> findRandomRecordBySameBbtiType(@Param("memberId") Integer memberId, Pageable pageable);


}
