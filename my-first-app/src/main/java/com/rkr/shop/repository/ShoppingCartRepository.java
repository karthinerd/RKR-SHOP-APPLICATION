
package com.rkr.shop.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rkr.shop.models.ShoppingCart;

@Repository
public interface ShoppingCartRepository extends JpaRepository<ShoppingCart,Integer> {

}
