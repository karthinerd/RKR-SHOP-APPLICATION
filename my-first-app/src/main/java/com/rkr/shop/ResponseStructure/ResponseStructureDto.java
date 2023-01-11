package com.rkr.shop.ResponseStructure;

import org.springframework.http.HttpStatus;
import lombok.Data;

@Data
public class ResponseStructureDto {
	
	private HttpStatus status;
	
	private ErrorResponseDto errorObject;
	
	private Object dataObject;
	
}