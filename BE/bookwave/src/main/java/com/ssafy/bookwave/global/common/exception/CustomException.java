package com.ssafy.bookwave.global.common.exception;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@Getter
@Setter
public class CustomException extends RuntimeException{
    private HttpStatus status;
    private int code;
    private String message;

    @Builder
    public CustomException(HttpStatus status, int code, String message) {
        this.status = status;
        this.code = code;
        this.message = message;
    }
}
