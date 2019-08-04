package com.bookstore.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bookstore.domain.User;
import com.bookstore.domain.UserBilling;
import com.bookstore.domain.UserPayment;
import com.bookstore.domain.security.UserRole;
import com.bookstore.repository.RoleRepository;
import com.bookstore.repository.UserBillingRepository;
import com.bookstore.repository.UserPaymentRepository;
import com.bookstore.repository.UserRepository;
import com.bookstore.repository.UserRoleRepository;
import com.bookstore.service.UserService;

@Service
public class UserServiceImpl implements UserService {
	private static final Logger LOG = LoggerFactory.getLogger(UserService.class);

	@Autowired
	private UserRoleRepository userRoleRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private RoleRepository roleRepository;
	
	@Autowired
	private UserBillingRepository userBillingRepository;
	
	@Autowired
	private UserPaymentRepository userPaymentRepository;

	@Transactional
	public User createUser(User user, Set<UserRole> userRoles) {
		User localUser = userRepository.findByUserName(user.getUsername());
		if (localUser != null) {
			LOG.info("User with username {} already exist. Nothing will be done.", user.getUsername());
		} else {

			/* for(UserRole ur: userRoles) { roleRepository.save(ur.getRole()); } */

			user.getUserRoles().addAll(userRoles);
			
			user.setUserPaymentList(new ArrayList<UserPayment>());

			/* localUser = (User) userRoleRepository.saveAll(userRoles); */
			localUser = userRepository.save(user);
		}
		return localUser;

	}

	@Override
	public User findByUsername(String username) {
		return userRepository.findByUserName(username);
	}

	@Override
	public User findByEmail(String email) {
		return userRepository.findByEmail(email);
	}

	@Override
	public User save(User user) {
		return userRepository.save(user);
	}

	@Override
	public Optional<User> findById(Long id) {
		return userRepository.findById(id);
	}
	
	@Override
	public void updateUserPaymentInfo(User user, UserBilling userBilling, UserPayment userPayment) {
		save(user);
		userBillingRepository.save(userBilling);
		userPaymentRepository.save(userPayment);
	}
	
	@Override
	public boolean updateUserBilling(UserBilling userBilling , UserPayment userPayment, User user) {
		userPayment.setUser(user);
		 userPayment.setUserBilling(userBilling); 
		userPayment.setDefaultPayment(true);
		userBilling.setUserPayment(userPayment); 
		user.getUserPaymentList().add(userPayment);
		if(save(user) != null) {
			return true;
		}
		else return false;
	}
	
	@Override
	public void setUserDefaultPayment(Long userPaymentId, User user) {

		List<UserPayment> userPaymentList = userPaymentRepository.findListByUserId(user.getId());

		for (UserPayment userPayment : userPaymentList) {
			if (userPayment.getId() == userPaymentId) {
				userPayment.setDefaultPayment(true);
				userPaymentRepository.save(userPayment);
			} else {
				userPayment.setDefaultPayment(false);
				userPaymentRepository.save(userPayment);

			}
		}
		 
	}
	/*
	 * @Override public User merge(User user) { // TODO Auto-generated method stub
	 * return userRepository.; }
	 */
}
