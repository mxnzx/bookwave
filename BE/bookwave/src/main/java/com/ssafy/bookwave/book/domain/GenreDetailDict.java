package com.ssafy.bookwave.book.domain;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class GenreDetailDict {

    @Id @GeneratedValue
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "genre_dict_id")
    private GenreDict genreDict;
    private String name;

    @OneToOne(mappedBy = "genreDetailDict", fetch = FetchType.LAZY)
    private Click click;

    public interface GenreDictIdInfoMapping {
        int getId();
    }

}


