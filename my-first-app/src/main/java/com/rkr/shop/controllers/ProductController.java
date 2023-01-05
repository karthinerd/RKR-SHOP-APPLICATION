package com.rkr.shop.controllers;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rkr.shop.models.Product;
import com.rkr.shop.repository.ProductRepository;
import com.rkr.shop.security.services.ProductService;


@RestController
@RequestMapping("/product")
@CrossOrigin("http://localhost:3000")
public class ProductController {

	@Autowired
	private ProductRepository productRepository;
	
	@Autowired
	private ProductService service;

	@PostMapping("/addProduct")
	@PreAuthorize("hasRole('ADMIN')")
	Product entity(@Valid @RequestBody Product entity) {

		Product alreadyExist = productRepository.findByProductName(entity.getProductName());
		
		if(alreadyExist!=null)throw new RuntimeException("This Product Name Already Taken");
		
		return productRepository.save(entity);
	}

	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	@GetMapping("/getProduct")
	List<Product> getAllUser() {
		return productRepository.findAll();
	}

	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/getProduct/{id}")
	Optional<Product> getById(@PathVariable Long id) {
		return service.getProductById(id);
	}

	@PreAuthorize("hasRole('ADMIN')")
	@PutMapping("/updateProduct/{id}")
	Product updateProduct(@RequestBody Product newProduct, @PathVariable Long id) {
		
		Product productIn = productRepository.findProductExistOrNot(newProduct.getProductName(),newProduct.getId() );
		if(productIn != null)throw new RuntimeException("ProductName Already Taken");
		return productRepository.findById(id).map(product -> {
			product.setProductName(newProduct.getProductName());
			product.setAvailableQuantity(newProduct.getAvailableQuantity());
			product.setProductDescription(newProduct.getProductDescription());
			product.setPrice(newProduct.getPrice());
			return productRepository.save(product);
		}).orElseThrow();
	}

	@PreAuthorize("hasRole('ADMIN')")
	@DeleteMapping("/deleteProduct/{id}")
	String deleteuser(@PathVariable Long id) {

		productRepository.deleteById(id);

		return "Product With Id " + id + " has been Deleted Successfully...";
	}

}
