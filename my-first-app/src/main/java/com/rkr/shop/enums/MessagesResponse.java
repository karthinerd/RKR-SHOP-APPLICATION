package com.rkr.shop.enums;

public enum MessagesResponse {

	USER_NAME_TAKEN("UserName Already Taken!!!"),
	EMAIL_ALREADY_EXIST("Email is already in use"),
	ERROR_WHILE_UPDATE("ERROR OCCURED"),
	POINTS_NOT_ENOGUH("Points Not Enough"),
	USER_NOT_FOUND("No Users Found With Given Id"),
	PRODUCT_NOT_FOUND("No Product Found With Given Id"),
	PRODUCT_NOT_AVAILABLE("PRODUCT NOT AVAILABLE NOW"),
	USER_NOT_AVAILABLE("User NOT AVAILABLE NOW"),
	PRODUCT_ALREADY_EXIST("This Product Already in Shop"),
	NO_ORDER_DETAILS("No Order Details"),
	USER_ALREADY_ACTIVATED("User Already Activated "),
	INACTIVE_USER("User is InActive"),
	NO_ACTIVE_LOG("No Activity Log"),
	
	USER_ACTIVATED("User Activated Succssfully"),
	ORDER_PLACED("Your Order Placed Successfully"),
	PRODUCT_ADDED("Product Added Successfully"),
	REGISTER_SUCCESSFULLY("User Registered Successfully"),
	UPDATED_SUCCESSFULLY("User Updated Successfully"),
	USER_DELETED("User Deleted Successfully");
	
	private String message;

	public String getMessage() {
		return message;
	}

	MessagesResponse(String message) {
		this.message=message;
	}
	
}
