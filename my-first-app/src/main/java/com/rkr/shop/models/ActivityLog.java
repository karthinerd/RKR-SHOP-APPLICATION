package com.rkr.shop.models;

import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Data;

@Entity
@Data
public class ActivityLog {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private Long userId;

	private LocalDate activatedAt;

	private String productName;

	private String userName;

	private int addedPoints;

	private int balancePoints;

	private int deductedPoints;

	private LocalDate deductedTime;

	private LocalDate pointsAddedAt;

}
