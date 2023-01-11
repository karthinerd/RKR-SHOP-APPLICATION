package com.rkr.shop.controllers;

import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.rkr.shop.ResponseStructure.ResponseStructureDto;
import com.rkr.shop.payload.request.LoginRequest;
import com.rkr.shop.payload.request.SignupRequest;
import com.rkr.shop.security.services.UserService;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

	@Autowired
	private UserService userService;

	@PostMapping("/signin")
	public ResponseEntity<ResponseStructureDto> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

		return userService.loginUser(loginRequest);

	}

	@PostMapping("/signup")
	public ResponseEntity<ResponseStructureDto> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {

		return userService.createUser(signUpRequest);

	}
 
	@PutMapping("/update/{id}")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<ResponseStructureDto> updateUser(@Valid @RequestBody SignupRequest signUpRequest,
			@PathVariable Long id) {

		return userService.updateUser(signUpRequest, id);

	}

	@GetMapping("/getAll")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<ResponseStructureDto> getAllUser() {

		return userService.getAllUser();

	}

	@GetMapping("/get/{id}")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<ResponseStructureDto> getUserById(@PathVariable Long id) {

		return userService.getUserById(id);
	}

	@DeleteMapping("/delete/{id}")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<ResponseStructureDto> delete(@PathVariable Long id) {

		return userService.deleteUserById(id);

	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/active/{id}")
	public ResponseEntity<ResponseStructureDto> activeUser(@PathVariable Long id){
		return userService.activeUser(id);
	}

}
