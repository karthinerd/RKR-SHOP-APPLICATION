package com.rkr.shop.security.services;

import java.util.List;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.rkr.shop.ResponseStructure.ErrorResponseDto;
import com.rkr.shop.ResponseStructure.ResponseStructureDto;
import com.rkr.shop.enums.MessagesResponse;
import com.rkr.shop.models.ActivityLog;
import com.rkr.shop.repository.ActivityLogRepository;

@Service
public class ActivityLogService {

	@Autowired
	private ActivityLogRepository activityLogRepository;

	public ResponseEntity<ResponseStructureDto> getAllUserActivity() {
		ResponseStructureDto responseStructure = new ResponseStructureDto();
		List<ActivityLog> user = activityLogRepository.findAll();
		if (Objects.nonNull(user)) {
			responseStructure.setStatus(HttpStatus.OK);
			responseStructure.setDataObject(user);
			return new ResponseEntity<ResponseStructureDto>(responseStructure, HttpStatus.OK);
		}
		responseStructure.setStatus(HttpStatus.NOT_FOUND);
		responseStructure.setErrorObject(new ErrorResponseDto(MessagesResponse.NO_ACTIVE_LOG.name(),
				MessagesResponse.NO_ACTIVE_LOG.getMessage()));
		return new ResponseEntity<ResponseStructureDto>(responseStructure, HttpStatus.NOT_FOUND);
	}

	public ResponseEntity<ResponseStructureDto> getActivityByUserId(Long id) {
		ResponseStructureDto responseStructure = new ResponseStructureDto();
		List<ActivityLog> activityLog = activityLogRepository.findByUserId(id);
		if (Objects.nonNull(activityLog)) {
			responseStructure.setStatus(HttpStatus.OK);
			responseStructure.setDataObject(activityLog);
			return new ResponseEntity<ResponseStructureDto>(responseStructure, HttpStatus.OK);
		}
		responseStructure.setStatus(HttpStatus.NOT_FOUND);
		responseStructure.setErrorObject(new ErrorResponseDto(MessagesResponse.NO_ACTIVE_LOG.name(),
				MessagesResponse.NO_ACTIVE_LOG.getMessage()));
		return new ResponseEntity<ResponseStructureDto>(responseStructure, HttpStatus.NOT_FOUND);
	}

}
