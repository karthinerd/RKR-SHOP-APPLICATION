package com.login.main.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.login.main.Entity.LoginEntity;
import com.login.main.Repository.LoginRepository;



@RestController
@CrossOrigin("http://localhost:3000")
public class LoginController {

	@Autowired
	private LoginRepository loginRepository;
	
	@PostMapping("/login")
	LoginEntity register(@RequestBody LoginEntity entity) {
		return loginRepository.save(entity);
	}
	
}
