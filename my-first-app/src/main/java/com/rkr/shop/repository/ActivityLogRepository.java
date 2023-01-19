package com.rkr.shop.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rkr.shop.models.ActivityLog;

@Repository
public interface ActivityLogRepository extends JpaRepository<ActivityLog, Long>{

	List<ActivityLog> findByUserId(Long id);

}
