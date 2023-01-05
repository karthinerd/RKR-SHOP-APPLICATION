package com.rkr.shop.models;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.Range;


import lombok.Data;

@Entity
@Data
@Table(name = "product_Entity", 
uniqueConstraints = { 
  @UniqueConstraint(columnNames = "productName")
})
public class Product {

	@Id
	@GeneratedValue
	private long id;
	
	@Column(name = "productName", nullable = false )
	@NotEmpty
	@Size(min=4 , message = "ProductName Should have at least 4 characters" , max=36)
	private String productName;
	
	private String productDescription;
	

	@Range(min=1, message = "Quantity Should have at least 1" )
	@NotNull
	private int availableQuantity;
	
	
	private int price;
	
}
