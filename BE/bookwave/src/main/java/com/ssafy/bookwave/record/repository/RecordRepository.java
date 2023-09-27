package com.ssafy.bookwave.record.repository;

import com.ssafy.bookwave.member.domain.Member;
import com.ssafy.bookwave.record.domain.Record;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RecordRepository extends JpaRepository<Record, Integer> {

    void deleteById(int recordId);
    List<Record> findByBookId(int bookId);
    List<Record> findByMember(Member member);
}
