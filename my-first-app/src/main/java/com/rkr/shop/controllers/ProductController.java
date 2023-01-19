package com.rkr.shop.controllers;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

import com.rkr.shop.ResponseStructure.ResponseStructureDto;
import com.rkr.shop.models.Product;
import com.rkr.shop.security.services.ProductService;

@RestController
@RequestMapping("/product")
@CrossOrigin("http://localhost:3000")
public class ProductController {

	@Autowired
	private ProductService productService;

	@PostMapping("/addProduct")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<ResponseStructureDto> createProduct(@RequestBody @Valid Product entity) {

		return productService.createProduct(entity);

	}

	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	@GetMapping("/getProduct")
	public ResponseEntity<ResponseStructureDto> getAllProduct() {

		return productService.getAllProduct();

	}

	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/getProduct/{id}")
	public ResponseEntity<ResponseStructureDto> getById(@PathVariable Long id) {

		return productService.getProductById(id);

	}

	@PreAuthorize("hasRole('ADMIN')")
	@PutMapping("/updateProduct/{id}")
	public ResponseEntity<ResponseStructureDto> updateProduct(@RequestBody Product newProduct, @PathVariable Long id) {

		return productService.updateProduct(newProduct, id);

	}

	@PreAuthorize("hasRole('ADMIN')")
	@DeleteMapping("/deleteProduct/{id}")
	public ResponseEntity<ResponseStructureDto> deleteuser(@PathVariable Long id) {

		return productService.deleteById(id);

	}

}
