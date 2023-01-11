package com.rkr.shop.ResponseStructure;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SuccessResponseDto {

	private String response;
	private String successMessage;
	
}
