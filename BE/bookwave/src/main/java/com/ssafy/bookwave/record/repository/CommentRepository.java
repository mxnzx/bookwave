package com.ssafy.bookwave.record.repository;

import com.ssafy.bookwave.record.domain.Comment;
import com.ssafy.bookwave.record.domain.Record;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Integer> {

    long countByRecord(Record record);

    List<Comment> findByRecord(Record record);
}
