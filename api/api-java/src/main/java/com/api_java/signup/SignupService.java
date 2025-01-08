package com.api_java.signup;

import com.api_java.exception.CustomException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class SignupService {
  private final Map<String, String> usersDb = new HashMap<>();
  private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

  public void signup(SignupRequest signRequest) {
      String id = signRequest.getId();
      String password = signRequest.getPassword();

      if (usersDb.containsKey(id)) {
          throw new CustomException("이미 사용 중인 ID입니다.", 409);
      }

      String hashedPassword = passwordEncoder.encode(password);
      usersDb.put(id, hashedPassword);
  }  
}
