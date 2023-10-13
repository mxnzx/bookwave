package com.ssafy.bookwave.book.domain;

import com.ssafy.bookwave.member.domain.MemberGenre;
import java.util.List;
import javax.persistence.*;

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
public class GenreDict {

    @Id @GeneratedValue
    private Integer id;
    private String name;

    @OneToMany(mappedBy = "genreDict", fetch = FetchType.LAZY)
    private List<GenreDetailDict> genreDetailDicts;
}
