package com.ssafy.bookwave.record.domain;

import com.ssafy.bookwave.book.domain.Book;
import com.ssafy.bookwave.global.domain.BaseTimeEntity;
import com.ssafy.bookwave.member.domain.Member;

import java.time.LocalDate;
import java.util.List;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

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
public class Record extends BaseTimeEntity {

    @Id
    @GeneratedValue
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "book_id")
    private Book book;

    private String name;
    private String content;
    private String imageUrl;
    private LocalDate startDate;
    private LocalDate endDate;
    private Double score;

    @OneToMany(mappedBy = "record", fetch = FetchType.LAZY)
    private List<RecordLike> recordLikes;

    @OneToMany(mappedBy = "record", fetch = FetchType.LAZY)
    private List<Comment> comments;

    public void updateName(String name) {
        this.name = name;
    }

    public void updateContent(String content) {
        this.content = content;
    }

    public void updateImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public void updateStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public void updateEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public void updateScore(Double score) {
        this.score = score;
    }

}
