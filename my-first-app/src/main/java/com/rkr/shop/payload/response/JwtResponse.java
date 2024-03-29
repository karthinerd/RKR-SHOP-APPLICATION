package com.rkr.shop.payload.response;

import java.util.List;

import lombok.Data;

@Data
public class JwtResponse {
	
	private Long id;
	private String username;
	private String email;
	private List<String> roles;
	private String accessToken;
	private String type = "Bearer";

	public JwtResponse(String accessToken, Long id, String username, String email, List<String> roles) {
		this.accessToken = accessToken;
		this.id = id;
		this.username = username;
		this.email = email;
		this.roles = roles;
	}

}
