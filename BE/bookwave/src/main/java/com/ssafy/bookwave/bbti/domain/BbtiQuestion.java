package com.ssafy.bookwave.bbti.domain;

import java.util.List;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.ssafy.bookwave.bbti.enums.Code;
import lombok.*;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@ToString
public class BbtiQuestion {

    @Id @GeneratedValue
    private Integer id;
    private String content;

    @OneToMany(mappedBy = "bbtiQuestion", fetch = FetchType.LAZY)

    private List<BbtiTypeElement> bbtiTypeElements;
}
