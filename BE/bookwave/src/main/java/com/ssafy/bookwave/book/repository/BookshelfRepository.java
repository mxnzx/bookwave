package com.ssafy.bookwave.book.repository;

import com.ssafy.bookwave.book.domain.BookshelfBook;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookshelfRepository extends JpaRepository<BookshelfBook, Integer> {

    List<BookshelfBook> findByMemberId(int memberId);

    BookshelfBook findByBookIdAndMemberId(int bookId, int memberId);
}
