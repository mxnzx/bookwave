package com.ssafy.bookwave.book.dto.response;


import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BookByBbtiChartResponseDto {

    private String bbtiType;
    private int bbtiCnt;
}
