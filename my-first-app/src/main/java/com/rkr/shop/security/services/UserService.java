package com.rkr.shop.security.services;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.rkr.shop.ResponseStructure.ErrorResponseDto;
import com.rkr.shop.ResponseStructure.ResponseStructureDto;
import com.rkr.shop.enums.MessagesResponse;
import com.rkr.shop.models.ERole;
import com.rkr.shop.models.Role;
import com.rkr.shop.models.User;
import com.rkr.shop.payload.request.LoginRequest;
import com.rkr.shop.payload.request.SignupRequest;
import com.rkr.shop.payload.response.JwtResponse;
import com.rkr.shop.repository.RoleRepository;
import com.rkr.shop.repository.UserRepository;
import com.rkr.shop.security.jwt.JwtUtils;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	PasswordEncoder encoder;

	@Autowired
	RoleRepository roleRepository;

	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	JwtUtils jwtUtils;

	public ResponseEntity<ResponseStructureDto> getAllUser() {
		ResponseStructureDto responseStructure = new ResponseStructureDto();
		List<User> user = userRepository.findAll();
		if (Objects.nonNull(user)) {
			responseStructure.setStatus(HttpStatus.OK);
			responseStructure.setDataObject(user);
			return new ResponseEntity<ResponseStructureDto>(responseStructure, HttpStatus.OK);
		}
		responseStructure.setStatus(HttpStatus.NOT_FOUND);
		responseStructure.setErrorObject(new ErrorResponseDto(MessagesResponse.USER_NOT_AVAILABLE.name(),
				MessagesResponse.USER_NOT_AVAILABLE.getMessage()));
		return new ResponseEntity<ResponseStructureDto>(responseStructure, HttpStatus.NOT_FOUND);
	}

	public ResponseEntity<ResponseStructureDto> getUserById(Long id) {
		ResponseStructureDto responseStructure = new ResponseStructureDto();
		Optional<User> userById = userRepository.findById(id);
		if (userById.isPresent()) {
			User user = userById.get();
			responseStructure.setStatus(HttpStatus.OK);
			responseStructure.setDataObject(user);
			return new ResponseEntity<ResponseStructureDto>(responseStructure, HttpStatus.OK);
		}
		responseStructure.setStatus(HttpStatus.NOT_FOUND);
		responseStructure.setErrorObject(new ErrorResponseDto(MessagesResponse.USER_NOT_FOUND.name(),
				MessagesResponse.USER_NOT_FOUND.getMessage()));
		return new ResponseEntity<ResponseStructureDto>(responseStructure, HttpStatus.NOT_FOUND);
	}

	public ResponseEntity<ResponseStructureDto> deleteUserById(Long id) {
		ResponseStructureDto responseStructure = new ResponseStructureDto();
		Optional<User> userById = userRepository.findById(id);
		if (userById.isPresent()) {
			userRepository.deleteById(id);
			responseStructure.setStatus(HttpStatus.OK);
			responseStructure.setDataObject(MessagesResponse.USER_DELETED.getMessage());
			return new ResponseEntity<ResponseStructureDto>(responseStructure, HttpStatus.OK);
		}
		responseStructure.setStatus(HttpStatus.NOT_FOUND);
		responseStructure.setErrorObject(new ErrorResponseDto(MessagesResponse.USER_NOT_FOUND.name(),
				MessagesResponse.USER_NOT_FOUND.getMessage()));
		return new ResponseEntity<ResponseStructureDto>(responseStructure, HttpStatus.NOT_FOUND);
	}

	public ResponseEntity<ResponseStructureDto> updateUser(@Valid SignupRequest signUpRequest, Long id) {

		ResponseStructureDto responseStructure = new ResponseStructureDto();

		if (userRepository.existsByUsername(signUpRequest.getUsername())) {
			responseStructure.setStatus(HttpStatus.BAD_REQUEST);
			responseStructure.setErrorObject(new ErrorResponseDto(MessagesResponse.USER_NAME_TAKEN.name(),
					MessagesResponse.USER_NAME_TAKEN.getMessage()));
			return new ResponseEntity<ResponseStructureDto>(responseStructure, HttpStatus.BAD_REQUEST);
		}

		if (userRepository.existsByEmail(signUpRequest.getEmail())) {
			responseStructure.setStatus(HttpStatus.BAD_REQUEST);
			responseStructure.setErrorObject(new ErrorResponseDto(MessagesResponse.EMAIL_ALREADY_EXIST.name(),
					MessagesResponse.EMAIL_ALREADY_EXIST.getMessage()));
			return new ResponseEntity<ResponseStructureDto>(responseStructure, HttpStatus.BAD_REQUEST);
		}

		Optional<User> userById = userRepository.findById(id);
		if (userById.isPresent()) {
			User user = userById.get();
			user.setUsername(signUpRequest.getUsername());
			user.setPassword(encoder.encode(signUpRequest.getPassword()));
			user.setEmail(signUpRequest.getEmail());
			user.setPoints(signUpRequest.getPoints());
			user.setPhoneNumber(signUpRequest.getPhoneNumber());
			user.setUpdatedAt(LocalDateTime.now());
			userRepository.save(user);
			responseStructure.setStatus(HttpStatus.OK);
			responseStructure.setDataObject(MessagesResponse.UPDATED_SUCCESSFULLY.getMessage());
			return new ResponseEntity<ResponseStructureDto>(responseStructure, HttpStatus.OK);
		}

		responseStructure.setStatus(HttpStatus.NOT_FOUND);
		responseStructure.setErrorObject(new ErrorResponseDto(MessagesResponse.USER_NOT_FOUND.name(),
				MessagesResponse.USER_NOT_FOUND.getMessage()));
		return new ResponseEntity<ResponseStructureDto>(responseStructure, HttpStatus.NOT_FOUND);

	}

	public ResponseEntity<ResponseStructureDto> createUser(@Valid SignupRequest signUpRequest) {

		ResponseStructureDto responseStructure = new ResponseStructureDto();

		if (userRepository.existsByUsername(signUpRequest.getUsername())) {
			responseStructure.setStatus(HttpStatus.BAD_REQUEST);
			responseStructure.setErrorObject(new ErrorResponseDto(MessagesResponse.USER_NAME_TAKEN.name(),
					MessagesResponse.USER_NAME_TAKEN.getMessage()));
			return new ResponseEntity<ResponseStructureDto>(responseStructure, HttpStatus.BAD_REQUEST);
		}

		if (userRepository.existsByEmail(signUpRequest.getEmail())) {
			responseStructure.setStatus(HttpStatus.BAD_REQUEST);
			responseStructure.setErrorObject(new ErrorResponseDto(MessagesResponse.EMAIL_ALREADY_EXIST.name(),
					MessagesResponse.EMAIL_ALREADY_EXIST.getMessage()));
			return new ResponseEntity<ResponseStructureDto>(responseStructure, HttpStatus.BAD_REQUEST);
		}

		Set<String> strRoles = signUpRequest.getRole();

		Set<Role> roles = new HashSet<>();

		// Create new user's account
		User user = new User(signUpRequest.getUsername(), signUpRequest.getEmail(), signUpRequest.getPhoneNumber(),
				encoder.encode(signUpRequest.getPassword()));

		if (strRoles.contains("admin")) {
			Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
					.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
			roles.add(adminRole);
			user.setIsActive("True");
			user.setActivatedAt(LocalDateTime.now());
		} else {
			Role userRole = roleRepository.findByName(ERole.ROLE_USER)
					.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
			roles.add(userRole);
			user.setIsActive("False");
		}

		user.setRoles(roles);
		userRepository.save(user);

		responseStructure.setStatus(HttpStatus.OK);
		responseStructure.setDataObject(MessagesResponse.REGISTER_SUCCESSFULLY.getMessage());
		return new ResponseEntity<ResponseStructureDto>(responseStructure, HttpStatus.OK);

	}

	public ResponseEntity<ResponseStructureDto> loginUser(@Valid LoginRequest loginRequest) {

		ResponseStructureDto responseStructure = new ResponseStructureDto();
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtUtils.generateJwtToken(authentication);

		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
		List<String> roles = userDetails.getAuthorities().stream().map(item -> item.getAuthority())
				.collect(Collectors.toList());

		JwtResponse user = new JwtResponse(jwt, userDetails.getId(), userDetails.getUsername(), userDetails.getEmail(),
				roles);
		Optional<User> userOne = userRepository.findById(user.getId());
		if (userOne.isPresent()) {
			User userTwo = userOne.get();
			if (userTwo.getIsActive().contains("False")) {
				responseStructure.setStatus(HttpStatus.BAD_REQUEST);
				responseStructure.setErrorObject(new ErrorResponseDto(MessagesResponse.INACTIVE_USER.name(),
						MessagesResponse.INACTIVE_USER.getMessage()));
				return new ResponseEntity<ResponseStructureDto>(responseStructure, HttpStatus.BAD_REQUEST);
			}
			responseStructure.setStatus(HttpStatus.OK);
			responseStructure.setDataObject(user);
			return new ResponseEntity<ResponseStructureDto>(responseStructure, HttpStatus.OK);
		}
		responseStructure.setStatus(HttpStatus.NOT_FOUND);
		responseStructure.setErrorObject(new ErrorResponseDto(MessagesResponse.USER_NOT_FOUND.name(),
				MessagesResponse.USER_NOT_FOUND.getMessage()));
		return new ResponseEntity<ResponseStructureDto>(responseStructure, HttpStatus.NOT_FOUND);
	}

	public ResponseEntity<ResponseStructureDto> activeUser(Long id) {
		ResponseStructureDto responseStructure = new ResponseStructureDto();
		Optional<User> userById = userRepository.findById(id);

		if (userById.isPresent()) {
			User user = userById.get();
			if (user.getIsActive().contains("False")) {
				user.setIsActive("True");
				user.setActivatedAt(LocalDateTime.now());
				user.setPoints(100);
				userRepository.save(user);
				responseStructure.setStatus(HttpStatus.OK);
				responseStructure.setDataObject(user);
				return new ResponseEntity<ResponseStructureDto>(responseStructure, HttpStatus.OK);
			} else {
				responseStructure.setStatus(HttpStatus.BAD_REQUEST);
				responseStructure.setErrorObject(new ErrorResponseDto(MessagesResponse.USER_ALREADY_ACTIVATED.name(),
						MessagesResponse.USER_ALREADY_ACTIVATED.getMessage()));
				return new ResponseEntity<ResponseStructureDto>(responseStructure, HttpStatus.BAD_REQUEST);
			}
		}
		responseStructure.setStatus(HttpStatus.NOT_FOUND);
		responseStructure.setErrorObject(new ErrorResponseDto(MessagesResponse.USER_NOT_FOUND.name(),
				MessagesResponse.USER_NOT_FOUND.getMessage()));
		return new ResponseEntity<ResponseStructureDto>(responseStructure, HttpStatus.NOT_FOUND);

	}
}
