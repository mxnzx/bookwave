package com.ssafy.bookwave.book.repository;

import com.ssafy.bookwave.book.domain.Book;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, Integer> {
    List<Book> findAllByGenreDetailDictId(Integer detailDictId);
}
