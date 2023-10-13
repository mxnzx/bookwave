package com.ssafy.bookwave.book.repository;

import com.ssafy.bookwave.book.domain.Book;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, Integer> {
    List<Book> findByGenreDetailDictId(Integer detailDictId);
    List<Book> findByEmotion(String emotion);
    List<Book> findByAuthorContainsOrTitleContains(String title, String author);
    List<Book> findByEmotionContaining(String emotion);

    List<Book> findByGenreDetailDictIdIn(List<Integer> genreDetailIds);

    // List<Book> findByGenreDetailDictIdInAndAuthorContainsOrTitleContains(List<Integer> genreDetailIds, String author, String title);

    // 죄송합니다 .. 리팩토링 하겠습니다 .. 위에 JPA 메서드명명이 잘 안됩니다 ..
    @Query("SELECT b FROM Book b " +
            "WHERE b.genreDetailDict.id IN :genreDetailIds " +
            "AND (b.title LIKE %:keyword% OR b.author LIKE %:keyword%)")
    List<Book> findByGenreDetailDictIdInAndAuthorContainsOrTitleContains(@Param("genreDetailIds") List<Integer> genreDetailIds,
                                                                         @Param("keyword") String keyword);

    //랜덤 정렬하고 5개씩 꺼내
    @Query(nativeQuery = true, value = "SELECT * FROM book WHERE emotion LIKE %?1% ORDER BY RAND() LIMIT 15")
    List<Book> findRandomBooksByEmotionContaining(String emotion);

    @Query("SELECT COUNT(b) FROM Book b WHERE b.genreDetailDict.id = :genreDetailDict")
    int countByGenreDetailDict(@Param("genreDetailDict") Integer genreDetailDict);

    // 3. 오프셋을 사용하여 책 조회
//    @Query("SELECT b FROM Book b WHERE b.genreDetailDict.id = :genreDetailDict")
//    List<Book> findBooksByGenreDetailDictWithOffset(@Param("genreDetailDict") Integer genreDetailDict, Pageable pageable);

    @Query(value = "SELECT * FROM book WHERE genre_detail_dict_id = :genreDetailDict ORDER BY RAND() LIMIT :limitValue", nativeQuery=true)
    List<Book> findRandomBooksByGenreDetailDict(@Param("genreDetailDict") Integer genreDetailDict, @Param("limitValue") int limit);

    @Query("SELECT COUNT(b) " +
            "FROM BookshelfBook b " +
            "JOIN b.member m " +
            "WHERE b.book.id = :bookId " +
            "AND (b.state = 0 OR b.state = 1 OR b.state = 2) " +
            "AND m.bbtiType.id = :bbtiTypeId")
    int CountByBbtiType(@Param("bookId") int bookId, @Param("bbtiTypeId") int bbtiTypeId);

}
