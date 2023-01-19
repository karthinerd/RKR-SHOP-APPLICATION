package com.rkr.shop.models;

import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@ToString
@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "myorder")
public class Order {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private Long userId;
	private String orderPlacedBy;
	private Long productId;
	private String productName;
	private int quantity;
	private int amount;
	private LocalDate orderPlacedAt;

	@PrePersist
	public void onSave() {

		LocalDate now = LocalDate.now();

		this.orderPlacedAt = now;
	}

}
