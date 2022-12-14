package com.product.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.product.Entity.ProductEntity;
import com.product.Repository.ProductRepository;
import com.product.Service.ProductService;



@RestController
@CrossOrigin("http://localhost:3000")
public class ProductController {

	@Autowired
	private ProductRepository productRepository;
	
	@Autowired
	private ProductService service;

	@PostMapping("/addProduct")
	ProductEntity entity(@RequestBody ProductEntity entity) {

		return productRepository.save(entity);
	}

	@GetMapping("/getProduct")
	List<ProductEntity> getAllUser() {
		return productRepository.findAll();
	}

	@GetMapping("/getProduct/{id}")
	Optional<ProductEntity> getById(@PathVariable Long id) {
		return service.getProductById(id);
	}

	@PutMapping("/updateProduct/{id}")
	ProductEntity updateProduct(@RequestBody ProductEntity newProduct, @PathVariable Long id) {
		return productRepository.findById(id).map(product -> {
			product.setProductName(newProduct.getProductName());
			product.setPointsRequired(newProduct.getPointsRequired());
			product.setAvailableQuantity(newProduct.getAvailableQuantity());
			product.setProductDescription(newProduct.getProductDescription());
			return productRepository.save(newProduct);
		}).orElseThrow();
	}

	@DeleteMapping("/deleteProduct/{id}")
	String deleteuser(@PathVariable Long id) {

		productRepository.deleteById(id);

		return "User With Id " + id + " has been Deleted Successfully...";
	}

}
