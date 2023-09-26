package com.ssafy.bookwave.record.repository;

import com.ssafy.bookwave.record.domain.Record;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecordRepository extends JpaRepository<Record, Integer> {

    void deleteById(int recordId);
}
