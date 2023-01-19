package com.rkr.shop.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rkr.shop.ResponseStructure.ResponseStructureDto;
import com.rkr.shop.security.services.ActivityLogService;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/auth")
public class ActivityLogCOntroller {

	@Autowired
	private ActivityLogService activityLogService;

	@GetMapping("/getAllActivityLog")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<ResponseStructureDto> getAllUserActivity() {

		return activityLogService.getAllUserActivity();

	}

	@GetMapping("/getActivityLog/{id}")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<ResponseStructureDto> getActivityByUserId(@PathVariable Long id) {

		return activityLogService.getActivityByUserId(id);

	}

}
