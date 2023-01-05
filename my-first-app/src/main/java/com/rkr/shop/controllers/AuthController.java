package com.rkr.shop.controllers;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rkr.shop.models.ERole;
import com.rkr.shop.models.Role;
import com.rkr.shop.models.User;
import com.rkr.shop.payload.request.LoginRequest;
import com.rkr.shop.payload.request.SignupRequest;
import com.rkr.shop.payload.response.JwtResponse;
import com.rkr.shop.payload.response.MessageResponse;
import com.rkr.shop.repository.RoleRepository;
import com.rkr.shop.repository.UserRepository;
import com.rkr.shop.security.jwt.JwtUtils;
import com.rkr.shop.security.services.UserDetailsImpl;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/auth")
public class AuthController {
	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	UserRepository userRepository;

	@Autowired
	RoleRepository roleRepository;

	@Autowired
	PasswordEncoder encoder;

	@Autowired
	JwtUtils jwtUtils;

	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtUtils.generateJwtToken(authentication);

		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
		List<String> roles = userDetails.getAuthorities().stream().map(item -> item.getAuthority())
				.collect(Collectors.toList());

		return ResponseEntity.ok(
				new JwtResponse(jwt, userDetails.getId(), userDetails.getUsername(), userDetails.getEmail(), roles));
	}

	@PostMapping("/signup")
	public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
		if (userRepository.existsByUsername(signUpRequest.getUsername())) {
			return ResponseEntity.badRequest().body(new MessageResponse("Error: Username is already taken!"));
		}

		if (userRepository.existsByEmail(signUpRequest.getEmail())) {
			return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already in use!"));
		}

		// Create new user's account
		User user = new User(signUpRequest.getUsername(), signUpRequest.getEmail(),signUpRequest.getPoints()
		 ,signUpRequest.getPhoneNumber(), encoder.encode(signUpRequest.getPassword()));
		
		
		Set<String> strRoles = signUpRequest.getRole();
		
		Set<Role> roles = new HashSet<>();
           
		if (strRoles == null) {
			Role userRole = roleRepository.findByName(ERole.ROLE_USER)
					.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
			roles.add(userRole);
		} else {
			strRoles.forEach(role -> {
				switch (role) {
				case "admin":
					Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(adminRole);
					break;
				default:
					Role userRole = roleRepository.findByName(ERole.ROLE_USER)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(userRole);
				}
			});
		}
		
		user.setRoles(roles);
		userRepository.save(user);

		return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
	}
	
	@PutMapping("/update/{id}")
	public ResponseEntity<MessageResponse> updateUser(@Valid @RequestBody SignupRequest signUpRequest,
			@PathVariable Long id , User user){
		if (userRepository.existsByUsername(signUpRequest.getUsername())) {
			return ResponseEntity.badRequest().body(new MessageResponse("Error: Username is already taken!"));
		}

		if (userRepository.existsByEmail(signUpRequest.getEmail())) {
			return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already in use!"));
		}
		
		
		if(userRepository.findById(id) != null) {
						
		user.setUsername(signUpRequest.getUsername());
		user.setPassword(encoder.encode(signUpRequest.getPassword()));
		user.setEmail(signUpRequest.getEmail());
		user.setPoints(signUpRequest.getPoints());
		user.setPhoneNumber(signUpRequest.getPhoneNumber());
		user.setUpdatedAt(LocalDateTime.now());
		userRepository.save(user);
		
		}
		return ResponseEntity.ok(new MessageResponse("User Updated successfully!"));
			
	}
	
	@GetMapping("/getAll")
	public List<User> getAllUser() {
		return userRepository.findAll();
	}
	
	@GetMapping("/get/{id}")
	public Optional<User> getUserById(@PathVariable Long id) {
		return userRepository.findById(id);
	}
	
	@DeleteMapping("/delete/{id}")
	String deleteuser(@PathVariable Long id) {

		userRepository.deleteById(id);

		return "User With Id " + id + " has been Deleted Successfully...";
	}
	
}
