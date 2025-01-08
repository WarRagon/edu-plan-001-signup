package com.api_java.response;

import com.fasterxml.jackson.annotation.JsonProperty;

public class SuccessResponse {

  @JsonProperty("status_code")
  private final int statusCode;

  @JsonProperty("content")
  private final String content;

  public SuccessResponse(int statusCode, String content) {
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