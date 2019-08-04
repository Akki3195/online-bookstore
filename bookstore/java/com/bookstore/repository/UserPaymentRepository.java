package com.bookstore.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.bookstore.domain.UserPayment;

public interface UserPaymentRepository extends JpaRepository<UserPayment, Long> {
		
	@Query("from UserPayment a where a.user.id=:userId")
	public List<UserPayment> findListByUserId(Long userId);
	
}
