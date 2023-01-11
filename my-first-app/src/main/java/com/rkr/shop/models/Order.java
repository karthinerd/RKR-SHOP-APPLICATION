package com.rkr.shop.models;

import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
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

	@OneToOne(cascade = CascadeType.MERGE)
	@JoinColumn(name = "user_id", referencedColumnName = "id")
	private User user;

	private String orderPlacedBy;

	@OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL, targetEntity = ShoppingCart.class)
	@JoinColumn(name = "order_id", referencedColumnName = "id")
	private List<ShoppingCart> cartItems;

	private int amount;

	private LocalDateTime orderPlacedAt;

	@PrePersist
	public void onSave() {

		LocalDateTime now = LocalDateTime.now();

		this.orderPlacedAt = now;
	}

	public Order(List<ShoppingCart> cartItems, User customer, String customerName) {
		this.user = customer;
		this.cartItems = cartItems;
		this.orderPlacedBy = customerName;

	}

}
