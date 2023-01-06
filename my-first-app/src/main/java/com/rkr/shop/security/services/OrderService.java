package com.rkr.shop.security.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.rkr.shop.ResponseStructure.ErrorResponseDto;
import com.rkr.shop.ResponseStructure.ResponseStructureDto;
import com.rkr.shop.enums.MessagesResponse;
import com.rkr.shop.models.Order;
import com.rkr.shop.models.Product;
import com.rkr.shop.models.ShoppingCart;
import com.rkr.shop.models.User;
import com.rkr.shop.repository.OrderRepository;
import com.rkr.shop.repository.ProductRepository;
import com.rkr.shop.repository.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
//@EnableJpaRepositories
public class OrderService {

	@Autowired
    private OrderRepository orderRepository;
	
	@Autowired
    private ProductRepository productRepository;
	
	@Autowired
    private UserRepository userRepository;

//    public OrderService(OrderRepository orderRepository, ProductRepository productRepository,UserRepository userRepository) {
//        this.orderRepository = orderRepository;
//        this.productRepository = productRepository;
//        this.userRepository = userRepository;
//    }

    public Order getOrderDetail(Integer orderId) {
        Optional<Order> order = this.orderRepository.findById(orderId);
        return order.isPresent() ? order.get() : null;
    }

    public int getCartAmount(List<ShoppingCart> shoppingCartList) {

        int totalCartAmount = 0;
        int singleCartAmount = 0;
        int availableQuantity = 0;

        for (ShoppingCart cart : shoppingCartList) {

            Long productId = cart.getProductId();
            Optional<Product> product = productRepository.findById(productId);
            if (product.isPresent()) {
                Product product1 = product.get();
                if (product1.getAvailableQuantity() < cart.getQuantity()) {
                    singleCartAmount = product1.getPrice() * product1.getAvailableQuantity();
                    cart.setQuantity(product1.getAvailableQuantity());
                } else {
                    singleCartAmount = cart.getQuantity() * product1.getPrice();
                    availableQuantity = product1.getAvailableQuantity() - cart.getQuantity();
                }
                totalCartAmount = totalCartAmount + singleCartAmount;
                product1.setAvailableQuantity(availableQuantity);
                availableQuantity=0;
                cart.setProductName(product1.getProductName());
                cart.setAmount(singleCartAmount);
                productRepository.save(product1);
            }
        }
        return totalCartAmount;
    }

    public Order saveOrder(Order order) {
        return orderRepository.save(order);
    }

	public ResponseEntity<ResponseStructureDto> reducePoints(Long customerIdFromDb, int amount) {
		int totalPoints = 0;
        int actualPoint = amount;
        int balancePoints = 0;
        ResponseStructureDto responseStructure = new ResponseStructureDto();
        
        	Optional<User> userOrg = userRepository.findById(customerIdFromDb); 
        	if(userOrg.isPresent()) {
        		User userMin = userOrg.get();
        		if (userMin.getPoints() < actualPoint) {
        			responseStructure.setStatus(HttpStatus.BAD_REQUEST);
        			responseStructure.setErrorObject(new ErrorResponseDto(MessagesResponse.POINTS_NOT_ENOGUH.name(),
        					MessagesResponse.POINTS_NOT_ENOGUH.getMessage()));
        			return new ResponseEntity<ResponseStructureDto>(responseStructure, HttpStatus.BAD_REQUEST);
                }
        		balancePoints = userMin.getPoints()-actualPoint;
        	
        		totalPoints=balancePoints;
        	userMin.setUsername(userMin.getUsername());
        	userMin.setPoints(totalPoints);
        	userRepository.save(userMin);
        	}
    		responseStructure.setStatus(HttpStatus.OK);
    		responseStructure.setDataObject(MessagesResponse.ORDER_PLACED.getMessage());
    		return new ResponseEntity<ResponseStructureDto>(responseStructure, HttpStatus.OK);		
	}
	
}
