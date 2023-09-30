package com.ssafy.bookwave.book.repository;

import com.ssafy.bookwave.book.domain.GenreDict;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GenreDictRepository extends JpaRepository<GenreDict,Integer> {
}
