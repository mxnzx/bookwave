package com.ssafy.bookwave.bbti.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.bookwave.bbti.enums.Code;

import javax.persistence.*;

import lombok.*;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
//@ToString
public class BbtiTypeElement {

    @Id @GeneratedValue
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bbti_question_id")
//    @JsonIgnore
    private BbtiQuestion bbtiQuestion;

    private String content;
    @Enumerated(EnumType.STRING)
    private Code code;

}
