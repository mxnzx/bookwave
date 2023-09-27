package com.ssafy.bookwave.book.dto.request;


import lombok.Data;

@Data
public class BookStateRequestDto {
    private int bookId;
    private int state;

}
