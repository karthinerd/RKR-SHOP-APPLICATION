package com.login.main.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.login.main.Entity.LoginEntity;
import com.login.main.Repository.LoginRepository;
import com.login.main.Service.LoginService;

import jakarta.validation.Valid;



@RestController
@CrossOrigin("http://localhost:3000")
public class LoginController {

	@Autowired
	private LoginService loginService;
	
	@Autowired
	private LoginRepository loginRepository;
	
	
	@PostMapping("/login")
	ResponseEntity<LoginEntity> register(@Valid @RequestBody LoginEntity entity) {
		
		LoginEntity inOrOut = loginRepository.findByEmailId(entity.getEmailId());
		
		if(inOrOut!= null) throw new RuntimeException("InValid Credentials");
		
		LoginEntity storeLogins = loginService.SaveLogins(entity);
		
		return new ResponseEntity<LoginEntity>(storeLogins, HttpStatus.CREATED);
	}
	
}
