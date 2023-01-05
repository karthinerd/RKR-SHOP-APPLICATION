package com.rkr.shop.security.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rkr.shop.models.Product;
import com.rkr.shop.repository.ProductRepository;


@Service
public class ProductService {
	
	@Autowired
	private ProductRepository repository;
	
	
	public Optional<Product> getProductById(Long id) {
		return repository.findById(id);
	}
	

}
