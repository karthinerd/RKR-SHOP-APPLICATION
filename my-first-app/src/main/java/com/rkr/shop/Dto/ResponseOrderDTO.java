package com.rkr.shop.Dto;


import lombok.Data;

@Data
public class ResponseOrderDTO {

	private int amount;
	private String date;
	private String productName;
	private String quantity;
	private long userId;
	private long orderId;
	private Long productId;
	
}
