package com.ssafy.bookwave.bbti.enums;

public enum Code {
    A("A"),
    B("B"),
    C("C"),
    D("D"),
    E("E"),
    F("F");
    private final String value;

    Code(String value){this.value=value;}
    public String getValue(){return value;}
}
