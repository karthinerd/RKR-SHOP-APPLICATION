package com.rkr.shop.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
import com.rkr.shop.Dto.ResponseOrderDTO;
import com.rkr.shop.ResponseStructure.ResponseStructureDto;
import com.rkr.shop.Util.DateUtil;
import com.rkr.shop.models.Order;
import com.rkr.shop.models.User;
import com.rkr.shop.security.services.OrderService;
import com.rkr.shop.security.services.UserDetailsServiceImpl;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/product/order")
public class OrderController {

	@Autowired
	private OrderService orderService;

	@Autowired
	private UserDetailsServiceImpl userService;

	private Logger logger = LoggerFactory.getLogger(OrderController.class);

	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	@GetMapping(value = "/getOrder/{orderId}")
	public ResponseEntity<ResponseStructureDto> getOrderDetails(@PathVariable int orderId) {

		return orderService.getOrderDetail(orderId);

	}

	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	@PostMapping("/placeOrder")
	public ResponseEntity<ResponseStructureDto> placeOrder(@RequestBody OrderDTO orderDTO) {
		ResponseOrderDTO responseOrderDTO = new ResponseOrderDTO();
		int amount = orderService.getCartAmount(orderDTO.getCartItems());
		User customer = new User(orderDTO.getCustomerName(), orderDTO.getCustomerEmail());
		Long customerIdFromDb = userService.isCustomerPresent(customer);
		if (customerIdFromDb != null) {
			customer.setId(customerIdFromDb);
			orderService.reducePoints(customerIdFromDb, amount);
			//logger.info("Customer already present in db with id : " + customerIdFromDb);
		} else {
			logger.info("No Customer Found with The Given Name and Email ");
		}
		Order order = new Order(orderDTO.getCartItems(), customer, orderDTO.getCustomerName());
		order.setAmount(amount);

		order = orderService.saveOrder(order);
		logger.info("Order processed successfully..");

		responseOrderDTO.setAmount(amount);
		responseOrderDTO.setDate(DateUtil.getCurrentDateTime());
		responseOrderDTO.setOrderId(order.getId());
		responseOrderDTO.setUserId(order.getUser().getId());
		logger.info("Order Placed..");

		ResponseStructureDto responseStructure = new ResponseStructureDto();
		responseStructure.setStatus(HttpStatus.OK);
		responseStructure.setDataObject(responseOrderDTO);
		return new ResponseEntity<ResponseStructureDto>(responseStructure, HttpStatus.OK);

	}
	
	@GetMapping("/orderHistory/{userId}")
	public ResponseEntity<ResponseStructureDto> getOrderHistory(@PathVariable Long userId){
		return orderService.getHistory(userId);
		
	}
}
