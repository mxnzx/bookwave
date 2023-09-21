package com.ssafy.bookwave.bbti.domain;

import com.ssafy.bookwave.member.domain.Member;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class BbtiType {

    @Id @GeneratedValue
    private Integer id;
    private String name;
    private String content;

    @OneToMany(mappedBy = "bbtiType", fetch = FetchType.LAZY)
    private List<Member> members;

}
