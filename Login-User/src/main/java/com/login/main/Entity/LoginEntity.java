package com.login.main.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class LoginEntity {

	@Id
	@GeneratedValue
	private long id;
	private String emailId;
	private String passWord;
	
}
