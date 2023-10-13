package com.ssafy.bookwave.bbti.dto.response;

import com.ssafy.bookwave.bbti.enums.Code;
import lombok.*;

import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@ToString
public class BbtiQuestionResponseDto {

    private String question;
    private String detail1;
    private String detail2;
    private Code code1;
    private Code code2;

    @Builder
    public BbtiQuestionResponseDto(String question, String detail1, String detail2, Code code1, Code code2) {
        this.question = question;
        this.detail1 = detail1;
        this.detail2 = detail2;
        this.code1 = code1;
        this.code2 = code2;
    }
}
