package com.product.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.product.Entity.ProductEntity;

public interface ProductRepository extends JpaRepository<ProductEntity, Long>{

}
