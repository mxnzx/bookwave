package com.ssafy.bookwave.record.repository;

import com.ssafy.bookwave.member.domain.Member;
import com.ssafy.bookwave.record.domain.RecordLike;
import com.ssafy.bookwave.record.domain.Record;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RecordLikeRepository extends JpaRepository<RecordLike, Integer> {
    Optional<RecordLike> findByRecordAndMember(Record record, Member member);
    long countByRecord(Record record);

    Optional<RecordLike> findByMemberIdAndRecordId(Integer id, int recordId);

    void deleteAllByRecordId(int recordId);
}
