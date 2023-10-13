package com.ssafy.bookwave.book.repository;

import com.ssafy.bookwave.book.domain.GenreDetailDict;
import com.ssafy.bookwave.book.domain.GenreDetailDict.GenreDictIdInfoMapping;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface GenreDetailDictRepository extends JpaRepository<GenreDetailDict, Integer> {

    //GenreDict 엔티티의 id 와 일치하는 GenreDetailDict를 반환하는 메서드
    List<GenreDictIdInfoMapping> findByGenreDictId(int genreId);

}


