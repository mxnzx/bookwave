package com.ssafy.bookwave.record.dto.response;

import lombok.*;

import java.util.List;


@Getter
public class RecordListResponseDto {

    List<Integer> recordIdList;

    @Builder
    public RecordListResponseDto(List<Integer> recordIdList) {
        this.recordIdList = recordIdList;
    }
}
