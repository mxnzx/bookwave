package com.ssafy.bookwave.member.repository;

import com.ssafy.bookwave.book.domain.GenreDetailDict;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GenreDetailRepository extends JpaRepository<GenreDetailDict,Integer> {

    List<GenreDetailDict> findByGenreDictId(Integer genreDictId);
}
