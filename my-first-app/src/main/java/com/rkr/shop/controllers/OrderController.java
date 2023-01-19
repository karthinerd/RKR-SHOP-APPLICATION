package com.rkr.shop.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.rkr.shop.Dto.OrderDTO;
import com.rkr.shop.ResponseStructure.ResponseStructureDto;
import com.rkr.shop.security.services.OrderService;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/product/order")
public class OrderController {

	@Autowired
	private OrderService orderService;

	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	@GetMapping(value = "/getOrder/{orderId}")
	public ResponseEntity<ResponseStructureDto> getOrderDetails(@PathVariable int orderId) {

		return orderService.getOrderDetail(orderId);

	}

	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	@PostMapping("/placeOrder")
	public ResponseEntity<ResponseStructureDto> placeOrder(@RequestBody OrderDTO orderDTO) {

		return orderService.orderPlace(orderDTO);

	}

	@GetMapping("/orderHistory/{userId}")
	public ResponseEntity<ResponseStructureDto> getOrderHistory(@PathVariable Long userId) {

		return orderService.getHistory(userId);

	}

	@GetMapping("/orderHistory")
	public ResponseEntity<ResponseStructureDto> getAllOrderHistory() {

		return orderService.getAllHistory();

	}

}
