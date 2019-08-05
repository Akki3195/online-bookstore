package com.bookstore.service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import com.bookstore.domain.User;
import com.bookstore.domain.UserBilling;
import com.bookstore.domain.UserPayment;
import com.bookstore.domain.UserShipping;
import com.bookstore.domain.security.UserRole;
import com.bookstore.repository.UserShippingRepository;

public interface UserService {
	
	User createUser(User user, Set<UserRole> userRoles);
	
	User findByUsername(String username);
	
	User findByEmail(String email);
	
	User save(User user);
	
	/* User merge(User user); */
	Optional<User> findById(Long id);
	
	void updateUserPaymentInfo(User user, UserBilling userBilling, UserPayment userPayment);
	
	boolean updateUserBilling(UserBilling userBilling , UserPayment userPayment, User user);
	
	void setUserDefaultPayment(Long userPaymentId, User user);
	
	void updateUserShipping(UserShipping userShipping, User user);
	
	void setUserDefaultShipping(Long userShippingId, User user);
	
	
	

}
