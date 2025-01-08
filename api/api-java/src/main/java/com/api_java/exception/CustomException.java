package com.api_java.exception;

import com.fasterxml.jackson.annotation.JsonProperty;

public class CustomException extends RuntimeException {
  
  @JsonProperty("status_code")
  private final int statusCode;
  
  @JsonProperty("content")
  private final String content;

  public CustomException(String content, int statusCode) {
      super(content);
      this.content = content;
      this.statusCode = statusCode;
  }

  public int getStatusCode() {
      return statusCode;
  }

  public String getContent() {
      return content;
  }
}