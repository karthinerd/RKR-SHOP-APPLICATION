package com.product.Entity;

import org.hibernate.validator.constraints.Range;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Entity
@Data
public class ProductEntity {

	@Id
	@GeneratedValue
	private long id;
	
	@Column(name = "username", nullable = false , unique = true)
	@NotEmpty
	@Size(min=4 , message = "ProductName Should have at least 4 characters" , max=36)
	private String productName;
	
	private String productDescription;
	

	@Range(min=1, message = "Quantity Should have at least 1" )
	@NotNull
	private int availableQuantity;
	
	@Range(min=1, message = "Points Should have at least 1")
	@NotNull
	private int pointsRequired;
	
	
	
}
