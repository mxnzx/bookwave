package com.ssafy.bookwave.global.exception.validator;

import com.ssafy.bookwave.global.exception.CustomException;
import com.ssafy.bookwave.member.enums.BaseErrorEnum;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
@Component
public class BaseValidator {

    public void checkPageAndSize(int page, int size) throws CustomException {
        validatePageNum(page);
        validateSize(size);
    }

    private void validatePageNum(int page) {
        if (page < 0) {
            throw CustomException.builder()
                    .status(HttpStatus.BAD_REQUEST)
                    .code(BaseErrorEnum.INVALID_PAGE_NUM.getCode())
                    .message(BaseErrorEnum.INVALID_PAGE_NUM.getMessage())
                    .build();
        }
    }

    private void validateSize(int size) {
        if (size < 0 || size > 50) {
            throw CustomException.builder()
                    .status(HttpStatus.BAD_REQUEST)
                    .code(BaseErrorEnum.INVALID_PAGE_SIZE.getCode())
                    .message(BaseErrorEnum.INVALID_PAGE_SIZE.getMessage())
                    .build();
        }
    }
}
