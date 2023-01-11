package com.rkr.shop.ResponseStructure;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ErrorResponseDto {

	private String errorCode;
	private String errorMessage;
	
}
