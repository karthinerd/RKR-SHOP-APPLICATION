package UserRegister.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;

import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Entity
@Data
public class RegisterEntity {

	@Id
	@GeneratedValue
	private long id;

	@Column(name = "username", unique = true)

	@NotBlank(message = "Name is mandatory")
	private String userName;

	@NotBlank(message = "Password is mandatory")
	private String passWord;

	@NotBlank(message = "Name is mandatory")
	private String confirmPassword;

	@Email
	private String emailId;

	@NotBlank(message = "Phone Number is mandatory")
	private String phoneNumber;

	@NotBlank(message = "Role is mandatory")
	private String roleName;

	private boolean isActive;

}
