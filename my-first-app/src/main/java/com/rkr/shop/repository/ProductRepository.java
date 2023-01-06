package com.rkr.shop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.rkr.shop.models.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>{

	Product findByProductName(String productName);
	
	@Query(value = "SELECT * FROM product_entity u where u.product_name=:productName and u.id <> :id", nativeQuery = true)
	Product findProductExistOrNot(@Param("productName") String productName,@Param("id") long id);

	boolean existsByProductName(String productName);
		
}
