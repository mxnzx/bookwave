package com.ssafy.bookwave.diary.domain;

import com.ssafy.bookwave.book.domain.Book;
import com.ssafy.bookwave.diary.dto.request.DiaryModifyRequestDto;
import com.ssafy.bookwave.global.domain.BaseTimeEntity;
import com.ssafy.bookwave.member.domain.Member;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Diary extends BaseTimeEntity {

    @Id @GeneratedValue
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "book_id")
    private Book book;

    private String content;

    private String color;

    private String emotion;


    public void update(DiaryModifyRequestDto diaryModifyRequest) {
        this.content = diaryModifyRequest.getContent();
        this.color = diaryModifyRequest.getColor();
    }
}
