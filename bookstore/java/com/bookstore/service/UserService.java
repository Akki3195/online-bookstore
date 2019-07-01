package com.bookstore.service;

import java.util.Optional;
import java.util.Set;

import com.bookstore.domain.User;
import com.bookstore.domain.security.UserRole;

public interface UserService {
	
	User createUser(User user, Set<UserRole> userRoles);
	
	User findByUsername(String username);
	
	User findByEmail(String email);
	
	User save(User user);
	
	Optional<User> findById(Long id);
	

}
