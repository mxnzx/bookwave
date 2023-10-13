package com.ssafy.bookwave.book.domain;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class BookEmotion {

    @Id
    private Integer id;

    @MapsId
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="book_id")
    private Book book;
    private double happy;
    private double confidence;
    private double peace;
    private double sad;
    private double angry;
    private double scare;
    private double tired;
    private double regret;


}
