package com.ssafy.bookwave.book.repository;

import com.ssafy.bookwave.book.domain.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Integer> {

}
