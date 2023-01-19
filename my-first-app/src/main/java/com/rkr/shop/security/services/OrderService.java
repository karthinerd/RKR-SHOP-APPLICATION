package com.rkr.shop.security.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.rkr.shop.Dto.OrderDTO;
import com.rkr.shop.ResponseStructure.ErrorResponseDto;
import com.rkr.shop.ResponseStructure.ResponseStructureDto;
import com.rkr.shop.enums.MessagesResponse;
import com.rkr.shop.models.ActivityLog;
import com.rkr.shop.models.Order;
import com.rkr.shop.models.Product;
import com.rkr.shop.models.User;
import com.rkr.shop.repository.ActivityLogRepository;
import com.rkr.shop.repository.OrderRepository;
import com.rkr.shop.repository.ProductRepository;
import com.rkr.shop.repository.UserRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class OrderService {

	@Autowired
	private OrderRepository orderRepository;

	@Autowired
	private ProductRepository productRepository;

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private ActivityLogRepository activityLogRepository;

	public ResponseEntity<ResponseStructureDto> getOrderDetail(long orderId) {
		Optional<Order> order = this.orderRepository.findById(orderId);
		ResponseStructureDto responseStructure = new ResponseStructureDto();
		if (order.isPresent()) {
			responseStructure.setStatus(HttpStatus.OK);
			responseStructure.setDataObject(order.get());
			return new ResponseEntity<ResponseStructureDto>(responseStructure, HttpStatus.OK);
		}
		responseStructure.setStatus(HttpStatus.BAD_REQUEST);
		responseStructure.setErrorObject(new ErrorResponseDto(MessagesResponse.NO_ORDER_DETAILS.name(),
				MessagesResponse.NO_ORDER_DETAILS.getMessage()));
		return new ResponseEntity<ResponseStructureDto>(responseStructure, HttpStatus.BAD_REQUEST);
	}

	public Order saveOrder(Order order) {
		return orderRepository.save(order);
	}

	public ResponseEntity<ResponseStructureDto> getHistory(Long userId) {

		List<Order> order = this.orderRepository.findByUserId(userId);

		ResponseStructureDto responseStructure = new ResponseStructureDto();
		if (Objects.nonNull(order)) {
			responseStructure.setStatus(HttpStatus.OK);
			responseStructure.setDataObject(order);
			return new ResponseEntity<ResponseStructureDto>(responseStructure, HttpStatus.OK);
		}
		responseStructure.setStatus(HttpStatus.BAD_REQUEST);
		responseStructure.setErrorObject(new ErrorResponseDto(MessagesResponse.NO_ORDER_DETAILS.name(),
				MessagesResponse.NO_ORDER_DETAILS.getMessage()));
		return new ResponseEntity<ResponseStructureDto>(responseStructure, HttpStatus.BAD_REQUEST);

	}

	public ResponseEntity<ResponseStructureDto> orderPlace(OrderDTO orderDTO) {

		ResponseStructureDto responseStructure = new ResponseStructureDto();

		int availableQuantity = 0;
		int totalPoints = 0;
		int balancePoints = 0 ;
		int deductedPoints = 0 ;

		Long productId = orderDTO.getProductId();
		Optional<User> userOrg = userRepository.findById(orderDTO.getUserId());
		Optional<Product> product = productRepository.findById(productId);
		
		if (product.isPresent() && userOrg.isPresent()) {
			Product product1 = product.get();
			User userMin = userOrg.get();
			if (userMin.getPoints() < product1.getPrice()) {
				int highPoint = product1.getPrice() - userMin.getPoints();
				responseStructure.setStatus(HttpStatus.BAD_REQUEST);
				responseStructure.setDataObject("You Need " +highPoint+" More Points to Place this Order");
				return new ResponseEntity<ResponseStructureDto>(responseStructure, HttpStatus.BAD_REQUEST);
			}

			availableQuantity = product1.getAvailableQuantity() - 1;
			product1.setAvailableQuantity(availableQuantity);
			productRepository.save(product1);

			balancePoints = userMin.getPoints();
			totalPoints = balancePoints - product1.getPrice();
			deductedPoints = product1.getPrice() + userMin.getDeductedPoints();

			userMin.setDeductedPoints(deductedPoints);
			userMin.setPoints(totalPoints);
			userRepository.save(userMin);
			
			ActivityLog activityLog = new ActivityLog();
			activityLog.setUserId(userMin.getId());
			activityLog.setUserName(userMin.getUsername());
			activityLog.setBalancePoints(totalPoints);
			activityLog.setActivatedAt(userMin.getActivatedAt());
			activityLog.setDeductedPoints(deductedPoints);
			activityLog.setProductName(product1.getProductName());
			activityLog.setDeductedTime(LocalDate.now());
			activityLogRepository.save(activityLog);			
			
			Order order = new Order();
			order.setProductId(product1.getId());
			order.setProductName(product1.getProductName());
			order.setQuantity(1);
			order.setAmount(product1.getPrice());
			order.setUserId(userMin.getId());
			order.setOrderPlacedBy(userMin.getUsername());
			orderRepository.save(order);

			responseStructure.setStatus(HttpStatus.OK);
			responseStructure.setDataObject(MessagesResponse.ORDER_PLACED.getMessage());
			return new ResponseEntity<ResponseStructureDto>(responseStructure, HttpStatus.OK);
		}
		responseStructure.setStatus(HttpStatus.BAD_REQUEST);
		responseStructure.setErrorObject(new ErrorResponseDto(MessagesResponse.USER_NOT_FOUND.name(),
				MessagesResponse.USER_NOT_FOUND.getMessage()));
		return new ResponseEntity<ResponseStructureDto>(responseStructure, HttpStatus.BAD_REQUEST);
	}

	public ResponseEntity<ResponseStructureDto> getAllHistory() {
		ResponseStructureDto responseStructure = new ResponseStructureDto();
		responseStructure.setStatus(HttpStatus.OK);
		responseStructure.setDataObject(orderRepository.findAll());
		return new ResponseEntity<ResponseStructureDto>(responseStructure, HttpStatus.OK);
	}

}
