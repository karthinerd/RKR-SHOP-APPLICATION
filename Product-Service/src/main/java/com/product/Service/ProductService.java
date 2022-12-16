package com.product.Service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.product.Entity.ProductEntity;
import com.product.Repository.ProductRepository;

@Service
public class ProductService {
	
	@Autowired
	private ProductRepository repository;
	
	
	public Optional<ProductEntity> getProductById(Long id) {
		return repository.findById(id);
	}
	
	

}
