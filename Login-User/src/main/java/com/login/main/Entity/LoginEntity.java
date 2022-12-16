package com.login.main.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Entity
@Data
public class LoginEntity {

	@Id
	@GeneratedValue
	private long id;
	

	@Email
	@NotEmpty
	private String emailId;
	
	@NotEmpty
	@Size(min=8 , message = "PassWord Should have at least 8 characters" , max=12)
	private String passWord;
	
	
}
