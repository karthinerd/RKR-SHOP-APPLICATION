package UserRegister.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import UserRegister.model.RegisterEntity;
import UserRegister.repository.RegisterRepository;

@Service
public class RegisterService {
	
	@Autowired
	private RegisterRepository registerRepository;
	
	public RegisterEntity createUser(RegisterEntity entity) {
		return registerRepository.save(entity);
	}

}
