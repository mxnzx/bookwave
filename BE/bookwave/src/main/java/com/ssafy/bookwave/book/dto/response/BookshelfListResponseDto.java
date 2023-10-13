package com.ssafy.bookwave.book.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@Builder
public class BookshelfListResponseDto {

    private String userNickname;
    private List<BookBookshelfResponseDto> wishBookList;
    private List<BookBookshelfResponseDto> readingBookList;
    private List<BookBookshelfResponseDto> doneBookList;

    public boolean isRecentListEmpty(){
        if(readingBookList.isEmpty() && doneBookList.isEmpty()){
            //읽는중인책도 없거나 다 읽은 책도 없는 경우
            return true;
        }
        return false;
    }

}
