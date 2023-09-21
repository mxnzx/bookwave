package com.ssafy.bookwave.reminder.enums;

import javax.persistence.criteria.CriteriaBuilder.In;

public enum Color {
    PINK(0),
    YELLOW(1),
    PURPLE(2),
    GREEN(3);

    private final Integer value;

    Color(Integer value){this.value=value;}
    public Integer getValue(){return value;}
}
