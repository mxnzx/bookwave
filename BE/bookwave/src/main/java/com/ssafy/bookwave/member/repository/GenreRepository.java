package com.ssafy.bookwave.member.repository;

import com.ssafy.bookwave.book.domain.GenreDict;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GenreRepository extends JpaRepository<GenreDict, Integer> {
}
