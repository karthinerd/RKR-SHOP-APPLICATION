package com.product.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class ProductEntity {

	@Id
	@GeneratedValue
	private long id;
	
	private String productName;
	
	private String productDescription;
	
	private int availableQuantity;
	
	private int pointsRequired;
	
	
	
}
