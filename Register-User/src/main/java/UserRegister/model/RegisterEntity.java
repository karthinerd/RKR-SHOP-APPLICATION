package UserRegister.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Entity
@Data
public class RegisterEntity {

	@Id
	@GeneratedValue
	private long id;

	@Column(name = "username", nullable = false , unique = true)
	@NotEmpty
	@Size(min=3 , message = "UserNAme Should have at least 3 characters" , max=36)
	private String userName;

	@NotEmpty
	@Size(min=8 , message = "PassWord Should have at least 8 characters" , max=12)
	private String passWord;

	@Size(min=8 , message = "PassWord Should have at least 8 characters" , max =12)
	private String confirmPassword;

	@Email
	@NotEmpty
	private String emailId;

	@Size(min=10 , message = "Phone Number Should have at least 10 numbers")
	private String phoneNumber;

	@NotBlank(message = "Role is mandatory")
	private String roleName;

	private boolean isActive;

}
