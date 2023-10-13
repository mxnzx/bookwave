package com.ssafy.bookwave.recommend.enums;

public enum Type {
    BBTI(0),
    EMOTION(1);

    private final Integer value;

    Type(Integer value){this.value=value;}
    public Integer getValue(){return value;}
}
