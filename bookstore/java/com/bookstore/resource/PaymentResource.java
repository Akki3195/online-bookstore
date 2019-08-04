package com.bookstore.resource;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.bookstore.domain.User;
import com.bookstore.domain.UserBilling;
import com.bookstore.domain.UserPayment;
import com.bookstore.service.UserPaymentService;
import com.bookstore.service.UserService;

@RestController
@RequestMapping("/payment")
public class PaymentResource {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private UserPaymentService userPaymentSerivce;
	
	@RequestMapping(value="/add", method=RequestMethod.POST)
	public ResponseEntity<String> addNewCreditCardPost(
			@RequestBody UserPayment userPayment,
			Principal principal){
		if(principal != null) {
		User user = userService.findByUsername(principal.getName());
		
		UserBilling userBilling = userPayment.getUserBilling();
		
			if (userService.updateUserBilling(userBilling, userPayment, user)) {
				return new ResponseEntity<String>("Payment Added(Updated) Successfully", HttpStatus.OK);
			}
			 
		}
		return new ResponseEntity<String>("Payment Added(Updated) Failed",HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@RequestMapping(value="/remove", method= RequestMethod.POST)
	public ResponseEntity<String> removePaymentPost(
			@RequestBody String id,
			Principal principal){
		
		//User user = userService.findByUsername(principal.getName());
		userPaymentSerivce.removeById(Long.parseLong(id));
		return new ResponseEntity<String>("Payment Removed Successfully",HttpStatus.OK);
	}
	
	@RequestMapping(value="/setDefault", method= RequestMethod.POST)
	public ResponseEntity<String> setDefaultPaymentPost(
			@RequestBody String id,
			Principal principal){
		
		User user = userService.findByUsername(principal.getName());
		userService.setUserDefaultPayment(Long.parseLong(id), user);
		 return new ResponseEntity<String>("Payment Removed Successfully",HttpStatus.OK);
	}
	
	@RequestMapping(value="/getUserPaymentList", method= RequestMethod.GET)
	public List<UserPayment> getUserPaymentList(Principal principal){
		
		User user = userService.findByUsername(principal.getName());
		List<UserPayment> userPaymentList = user.getUserPaymentList();
		
		return userPaymentList;
	}
	
	
	
}
