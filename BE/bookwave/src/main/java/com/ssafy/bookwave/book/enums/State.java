package com.ssafy.bookwave.book.enums;

public enum State {
    WISH(0),
    READING(1),
    DONE(2),
    DELETE(3);

    private final Integer value;

    State(Integer value){this.value=value;}
    public Integer getValue(){return value;}
}
