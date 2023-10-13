package com.ssafy.bookwave.reminder.domain;

import com.ssafy.bookwave.book.domain.Book;
import com.ssafy.bookwave.global.domain.BaseTimeEntity;
import com.ssafy.bookwave.member.domain.Member;
import com.ssafy.bookwave.reminder.dto.request.ReminderModifyRequestDto;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Reminder extends BaseTimeEntity {

    @Id @GeneratedValue
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "book_id")
    private Book book;

    private String content;
    private Integer page;
    private String color;


    public void update(ReminderModifyRequestDto reminderModifyRequest) {
        this.id = reminderModifyRequest.getReminderId();
        this.content = reminderModifyRequest.getContent();
        this.page = reminderModifyRequest.getPage();
        this.color = reminderModifyRequest.getColor();
    }
}
