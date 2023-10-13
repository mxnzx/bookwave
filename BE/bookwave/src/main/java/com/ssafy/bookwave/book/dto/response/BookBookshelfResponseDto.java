package com.ssafy.bookwave.book.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
public class BookBookshelfResponseDto {

    private int bookId;
    private String isbn;
    private String bookImageUrl;
    private String bookTitle;
    private String bookAuthor;
    private int state;

    @Builder

    public BookBookshelfResponseDto(int bookId,String isbn, String bookImageUrl, String bookTitle, String bookAuthor, int state) {
        this.bookId = bookId;
        this.isbn = isbn;
        this.bookImageUrl = bookImageUrl;
        this.bookTitle = bookTitle;
        this.bookAuthor = bookAuthor;
        this.state = state;
    }
}
