package com.rkr.shop.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.rkr.shop.models.Order;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

	List<Order> findByUserId(@Param("userId") Long userId);
	
}
