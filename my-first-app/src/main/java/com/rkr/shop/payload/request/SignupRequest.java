package com.rkr.shop.payload.request;


import java.util.Set;

import javax.validation.constraints.*;

import lombok.Data;

@Data
public class SignupRequest {
	
  @NotBlank
  @Size(min = 3, max = 20)
  private String username;

  @NotBlank
  @Size(max = 50)
  @Email
  private String email;

  private Set<String> role;

  @Size(min = 6, max = 40)
  private String password;
  
  private int points;
  
  private String phoneNumber;
  
  private boolean isActive;
  
}
