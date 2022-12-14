package UserRegister.Exception;

public class UserNotFoundException extends RuntimeException {

	public UserNotFoundException(Long id) {
		super("Could not Found the User with id --->" + id);
	}
}
