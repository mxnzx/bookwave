package com.ssafy.bookwave.book.domain;

import com.ssafy.bookwave.member.domain.MemberBookScore;
import com.ssafy.bookwave.record.domain.Record;
import com.ssafy.bookwave.reminder.domain.Reminder;
import java.util.List;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.mapping.Join;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Book {

    @Id @GeneratedValue
    private Integer id;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "genre_detail_dict_id")
    private GenreDetailDict genreDetailDict;
    private String isbn;
    private String title;
    private String author;
    private String content;
    private String imageUrl;
    private String publisher;
    private double score;
    private String publishDate;
    private String emotion;

    @OneToMany(mappedBy = "book", fetch = FetchType.LAZY)
    private List<BookshelfBook> bookshelfBooks;

    @OneToMany(mappedBy = "book", fetch = FetchType.LAZY)
    private List<Record> records;

    @OneToMany(mappedBy = "book", fetch = FetchType.LAZY)
    private List<Reminder> reminders;

    @OneToMany(mappedBy = "book", fetch = FetchType.LAZY)
    private List<MemberBookScore> memberBookScores;

    public void updateScore(double score){
        this.score = score;
    }

    public void updateEmotion(String emotion){
        this.emotion = emotion;}
}
