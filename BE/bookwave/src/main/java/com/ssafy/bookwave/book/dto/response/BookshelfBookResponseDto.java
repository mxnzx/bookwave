package com.ssafy.bookwave.book.dto.response;

import com.ssafy.bookwave.book.domain.Book;
import com.ssafy.bookwave.book.domain.BookshelfBook;
import com.ssafy.bookwave.book.enums.State;
import com.ssafy.bookwave.member.domain.Member;
import com.ssafy.bookwave.member.dto.response.MemberInfoResponseDto;
import lombok.*;

@Data
@NoArgsConstructor
@Getter
public class BookshelfBookResponseDto {

    private int id;
    private MemberInfoResponseDto memberId;
    private BookResponseDto bookId;
    private State state;

    @Builder
    public BookshelfBookResponseDto(int id, MemberInfoResponseDto memberId, BookResponseDto bookId, State state) {
        this.id = id;
        this.memberId = memberId;
        this.bookId = bookId;
        this.state = state;
    }
}
