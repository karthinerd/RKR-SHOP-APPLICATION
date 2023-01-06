package com.rkr.shop.security.services;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.rkr.shop.ResponseStructure.ErrorResponseDto;
import com.rkr.shop.ResponseStructure.ResponseStructureDto;
import com.rkr.shop.enums.MessagesResponse;
import com.rkr.shop.models.Product;
import com.rkr.shop.repository.ProductRepository;

@Service
public class ProductService { 

	@Autowired
	private ProductRepository repository;

	public ResponseEntity<ResponseStructureDto> getProductById(Long id) {
		ResponseStructureDto responseStructure = new ResponseStructureDto();
		Optional<Product> findProduct = repository.findById(id);
		if (findProduct.isPresent()) {
			Product product = findProduct.get();
			responseStructure.setStatus(HttpStatus.OK);
			responseStructure.setDataObject(product);
			return new ResponseEntity<ResponseStructureDto>(responseStructure, HttpStatus.OK);
		}
		responseStructure.setStatus(HttpStatus.NOT_FOUND);
		responseStructure.setErrorObject(new ErrorResponseDto(MessagesResponse.PRODUCT_NOT_FOUND.name(),
				MessagesResponse.PRODUCT_NOT_FOUND.getMessage()));
		return new ResponseEntity<ResponseStructureDto>(responseStructure, HttpStatus.NOT_FOUND);
	}

	public Product findByProductName(String productName) {
		Product findProductName = repository.findByProductName(productName);
		return findProductName;
	}

	public ResponseEntity<ResponseStructureDto> createProduct(Product entity) {
		ResponseStructureDto responseStructure = new ResponseStructureDto();
		if (repository.existsByProductName(entity.getProductName())) {
			responseStructure.setStatus(HttpStatus.BAD_REQUEST);
			responseStructure.setErrorObject(new ErrorResponseDto(MessagesResponse.PRODUCT_ALREADY_EXIST.name(),
					MessagesResponse.PRODUCT_ALREADY_EXIST.getMessage()));
			return new ResponseEntity<ResponseStructureDto>(responseStructure, HttpStatus.BAD_REQUEST);
		}
		Product product = repository.save(entity);
		responseStructure.setStatus(HttpStatus.OK);
		responseStructure.setDataObject(product);
		return new ResponseEntity<ResponseStructureDto>(responseStructure, HttpStatus.OK);
	}

	public ResponseEntity<ResponseStructureDto> getAllProduct() {
		ResponseStructureDto responseStructure = new ResponseStructureDto();
		List<Product> product = repository.findAll();
		if (product.isEmpty()) {
			responseStructure.setStatus(HttpStatus.NOT_FOUND);
			responseStructure.setErrorObject(new ErrorResponseDto(MessagesResponse.PRODUCT_NOT_AVAILABLE.name(),
					MessagesResponse.PRODUCT_NOT_AVAILABLE.getMessage()));
			return new ResponseEntity<ResponseStructureDto>(responseStructure, HttpStatus.NOT_FOUND);
		}
		responseStructure.setStatus(HttpStatus.OK);
		responseStructure.setDataObject(product);
		return new ResponseEntity<ResponseStructureDto>(responseStructure, HttpStatus.OK);
	}

	public ResponseEntity<ResponseStructureDto> deleteById(Long id) {
		ResponseStructureDto responseStructure = new ResponseStructureDto();
		Optional<Product> findProduct = repository.findById(id);
		if (findProduct.isPresent()) {
			repository.deleteById(id);
			responseStructure.setStatus(HttpStatus.OK);
			responseStructure.setDataObject(MessagesResponse.USER_DELETED.getMessage());
			return new ResponseEntity<ResponseStructureDto>(responseStructure, HttpStatus.OK);
		}
		responseStructure.setStatus(HttpStatus.NOT_FOUND);
		responseStructure.setErrorObject(new ErrorResponseDto(MessagesResponse.PRODUCT_NOT_FOUND.name(),
				MessagesResponse.PRODUCT_NOT_FOUND.getMessage()));
		return new ResponseEntity<ResponseStructureDto>(responseStructure, HttpStatus.NOT_FOUND);
	}

	public ResponseEntity<ResponseStructureDto> updateProduct(Product newProduct, Long id) {

		ResponseStructureDto responseStructure = new ResponseStructureDto();

		if (repository.existsByProductName(newProduct.getProductName())) {
			responseStructure.setStatus(HttpStatus.BAD_REQUEST);
			responseStructure.setErrorObject(new ErrorResponseDto(MessagesResponse.PRODUCT_ALREADY_EXIST.name(),
					MessagesResponse.PRODUCT_ALREADY_EXIST.getMessage()));
			return new ResponseEntity<ResponseStructureDto>(responseStructure, HttpStatus.BAD_REQUEST);
		}
		
		Optional<Product> findProduct = repository.findById(id);
		
		if (findProduct.isPresent()) {
			Product product = new Product();
			product.setProductName(newProduct.getProductName());
			product.setAvailableQuantity(newProduct.getAvailableQuantity());
			product.setProductDescription(newProduct.getProductDescription());
			product.setPrice(newProduct.getPrice());
			repository.save(product);
			responseStructure.setStatus(HttpStatus.OK);
			responseStructure.setDataObject(product);
			return new ResponseEntity<ResponseStructureDto>(responseStructure, HttpStatus.OK);
		}
		responseStructure.setStatus(HttpStatus.NOT_FOUND);
		responseStructure.setErrorObject(new ErrorResponseDto(MessagesResponse.PRODUCT_NOT_FOUND.name(),
				MessagesResponse.PRODUCT_NOT_FOUND.getMessage()));
		return new ResponseEntity<ResponseStructureDto>(responseStructure, HttpStatus.NOT_FOUND);
	}
	
}
