package UserRegister.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import UserRegister.Exception.UserNotFoundException;
import UserRegister.model.RegisterEntity;
import UserRegister.repository.RegisterRepository;

@RestController
@CrossOrigin("http://localhost:3000")
public class RegisterController {

	@Autowired
	private RegisterRepository registerRepository;
	
	@PostMapping("/register")
	RegisterEntity register(@RequestBody RegisterEntity entity) {
		return registerRepository.save(entity);
	}
	
	@GetMapping("/getUser")
	List<RegisterEntity> getAllUser(){
		return registerRepository.findAll();
	}
	
	@GetMapping("/getUser/{id}")
	RegisterEntity getUserById(@PathVariable Long id) {
		return registerRepository.findById(id).orElseThrow(()-> new UserNotFoundException(id));
	}
	
	@PutMapping("/user/{id}")
		RegisterEntity updateUser(@RequestBody RegisterEntity newUser , @PathVariable Long id) {
			return registerRepository.findById(id)
					.map(user -> {
						user.setUserName(newUser.getUserName());
						user.setEmailId(newUser.getEmailId());
						user.setPassWord(newUser.getPassWord());
						user.setConfirmPassword(newUser.getConfirmPassword());
						user.setPhoneNumber(newUser.getPhoneNumber());
						return registerRepository.save(user);
					}).orElseThrow(()-> new UserNotFoundException(id));
		}
	
	@DeleteMapping("/user/{id}")
		String deleteuser(@PathVariable Long id) {
			if(!registerRepository.existsById(id)) {
				throw new UserNotFoundException(id);
			}
			
			registerRepository.deleteById(id);
			
			return "User With Id "+id+" has been Deleted Successfully...";
		}
	}
	

