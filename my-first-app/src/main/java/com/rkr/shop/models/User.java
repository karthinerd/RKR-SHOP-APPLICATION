package com.rkr.shop.models;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.PrePersist;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Data
@Table(name = "users", uniqueConstraints = { @UniqueConstraint(columnNames = "username"),
		@UniqueConstraint(columnNames = "email") })
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotBlank
	@Size(max = 20)
	private String username;

	@NotBlank
	@Size(max = 50)
	@Email
	private String email;

	@Size(max = 120)
	private String password;

	private int points;
	
	private int deductedPoints;

	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
	private Set<Role> roles = new HashSet<>();

	 @Size(min=7 , max = 11 , message = "Phone Number Should have at least 7 numbers")
	private String phoneNumber;

	private String isActive;

	private LocalDate createdAt;

	private LocalDate updatedAt;

	private LocalDate activatedAt;
	
	@PrePersist
	public void onSave() {

		LocalDate now = LocalDate.now();

		this.createdAt = now;

		this.updatedAt = now;
	}

	public User(String username, String email, String phoneNumber, String password) {
		this.username = username;
		this.email = email;
		this.password = password;
		this.phoneNumber = phoneNumber;
	}

	public User(String username, String email) {
		this.username = username;
		this.email = email;
	}

}
