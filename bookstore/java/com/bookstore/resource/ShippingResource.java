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
import com.bookstore.domain.UserShipping;
import com.bookstore.service.UserService;
import com.bookstore.service.UserShippingSerivce;

@RestController
@RequestMapping("/shipping")
public class ShippingResource {

	@Autowired
	private UserService userService;
	
	@Autowired
	private UserShippingSerivce userShippingService;
	
	@RequestMapping(value="/add", method=RequestMethod.POST)
	public ResponseEntity<String> addNewUserShippingPost(@RequestBody UserShipping userShipping, Principal principal){
		User user = userService.findByUsername(principal.getName());
		userService.updateUserShipping(userShipping, user);
		
		return new ResponseEntity<String>("Shipping Added(Updated) Successfully", HttpStatus.OK);
		
	}
	
	@RequestMapping(value="/getUserShippingList")
	public List<UserShipping> getUserShippingList(Principal principal){
		User user = userService.findByUsername(principal.getName());
		List<UserShipping> userShippingList = user.getUserShippingList();
		
		return userShippingList;
	}
	
	@RequestMapping(value="/remove", method= RequestMethod.POST)
	public ResponseEntity<String> removeUserShippingPost(@RequestBody String id, Principal principal){
		userShippingService.removeById(Long.parseLong(id));
		
		return new ResponseEntity<String>("Shipping Removed Successfully", HttpStatus.OK);
	}
	
	@RequestMapping(value="/setDefault", method = RequestMethod.POST)
	public ResponseEntity<String> setDefaultShippingPost(@RequestBody String id, Principal principal){
		User user = userService.findByUsername(principal.getName());
		userService.setUserDefaultShipping(Long.parseLong(id), user);
		
		return new ResponseEntity<String>("Set Default Shipping Successfully", HttpStatus.OK);
	}
}
