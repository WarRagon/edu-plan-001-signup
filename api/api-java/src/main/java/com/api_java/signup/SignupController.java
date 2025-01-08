package com.api_java.signup;

import com.api_java.response.SuccessResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api")
public class SignupController {

  private final SignupService signupService;

  public SignupController(SignupService signupService) {
      this.signupService = signupService;
  }

  @PostMapping("/signup")
  public ResponseEntity<?> signup(@Valid @RequestBody SignupRequest signupRequest) {
    signupService.signup(signupRequest);
    return ResponseEntity.status(HttpStatus.CREATED)
    .body(new SuccessResponse(HttpStatus.CREATED.value(), "회원가입 성공"));
}
  
}
