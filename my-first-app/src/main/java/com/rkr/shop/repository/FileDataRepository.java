package com.rkr.shop.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rkr.shop.models.FileData;

import java.util.Optional;

public interface FileDataRepository extends JpaRepository<FileData,Integer> {
	
    Optional<FileData> findByName(String fileName);
    
}
