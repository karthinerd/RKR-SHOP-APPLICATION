package com.login.main.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.login.main.Entity.LoginEntity;
import com.login.main.Repository.LoginRepository;

@Service
public class LoginService {

	@Autowired
	private LoginRepository loginRepository;

    public LoginEntity SaveLogins(LoginEntity entity) {
    	return loginRepository.save(entity);
    }
}
