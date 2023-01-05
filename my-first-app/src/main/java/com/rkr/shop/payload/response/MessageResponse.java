package com.rkr.shop.payload.response;


public class MessageResponse {
  private String message;


 public MessageResponse(String message2) {
	  this.message = message2;
}

public String getMessage() {
    return message;
  }

  public void setMessage(String message) {
    this.message = message;
  }
}
