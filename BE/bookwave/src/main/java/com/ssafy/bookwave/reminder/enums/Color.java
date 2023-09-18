package com.ssafy.bookwave.reminder.enums;

import javax.persistence.criteria.CriteriaBuilder.In;

public enum Color {
    DEEPGREEN(0),
    PINK(1),
    GREEN(2);

    private final Integer value;

    Color(Integer value){this.value=value;}
    public Integer getValue(){return value;}
}
