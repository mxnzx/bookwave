package com.ssafy.bookwave.bbti.dto.request;

import lombok.Getter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Getter
@ToString
public class BbtiRequestDto {
    private int memberId;
    private List<String> bbtiList = new ArrayList<>();
}
