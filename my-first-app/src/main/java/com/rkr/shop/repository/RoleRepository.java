package com.rkr.shop.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rkr.shop.models.ERole;
import com.rkr.shop.models.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
	
	Optional<Role> findByName(ERole name);
	
}
