package com.api_java.signup;

import jakarta.validation.constraints.NotEmpty;

public class SignupRequest {
  @NotEmpty(message = "ID는 필수입니다.")
  private String id;

  @NotEmpty(message = "Password는 필수입니다.")
  private String password;

  public String getId() {
      return id;
  }

  public void setId(String id) {
      this.id = id;
  }

  public String getPassword() {
      return password;
  }

  public void setPassword(String password) {
      this.password = password;
  }
}