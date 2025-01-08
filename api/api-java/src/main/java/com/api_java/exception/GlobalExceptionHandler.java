package com.api_java.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.fasterxml.jackson.annotation.JsonProperty;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(CustomException.class)
    public ResponseEntity<?> handleCustomException(CustomException ex) {
        return ResponseEntity.status(ex.getStatusCode())
                .body(new ErrorResponse(ex.getStatusCode(), ex.getContent()));
    }

    public static class ErrorResponse {
        
        @JsonProperty("status_code")
        private final int statusCode;
        
        @JsonProperty("content")
        private final String content;

        public ErrorResponse(int statusCode, String content) {
            this.statusCode = statusCode;
            this.content = content;
        }

        public int getStatusCode() {
            return statusCode;
        }

        public String getContent() {
            return content;
        }
    }
}