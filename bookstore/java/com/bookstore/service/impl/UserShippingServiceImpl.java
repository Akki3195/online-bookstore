package com.bookstore.service.impl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bookstore.domain.UserShipping;
import com.bookstore.repository.UserShippingRepository;
import com.bookstore.service.UserShippingSerivce;

@Service
public class UserShippingServiceImpl implements UserShippingSerivce {
	@Autowired
	private UserShippingRepository userShippingRepository;
	
	@Override
	public Optional<UserShipping> findById(Long id) {
		return userShippingRepository.findById(id);
	}

	@Override
	public void removeById(Long id) {
		userShippingRepository.deleteById(id);
	}

}
