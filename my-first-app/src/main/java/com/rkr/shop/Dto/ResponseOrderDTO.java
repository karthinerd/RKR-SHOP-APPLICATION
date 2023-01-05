package com.rkr.shop.Dto;

import java.util.List;

import com.rkr.shop.models.ShoppingCart;

import lombok.Data;

@Data
public class ResponseOrderDTO {

    private int amount;
    private String date;
    private List<ShoppingCart> productName;
    private String quantity;
    private long userId;
    private long orderId;

}
