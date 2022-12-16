package com.login.main.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.login.main.Entity.LoginEntity;

public interface LoginRepository extends JpaRepository<LoginEntity, Long>{
	
	LoginEntity findByEmailId(String emailId);

}
