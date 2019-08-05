package com.bookstore.service;

import java.util.Optional;

import com.bookstore.domain.UserShipping;

public interface UserShippingSerivce {
	
	Optional<UserShipping> findById(Long id);
	void removeById(Long id);
	

}
