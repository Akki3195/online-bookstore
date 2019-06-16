package com.bookstore.resource;

import java.util.Collections;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.bookstore.service.UserService;

@RestController
public class LoginResource {
	@Autowired
	private UserService userService;
	
	@RequestMapping("/token")
	public Map<String, String> token(HttpSession session, HttpServletRequest request){
		return Collections.singletonMap("token", session.getId());		
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/checkSession")
	public ResponseEntity checkSession(HttpServletRequest request, HttpServletResponse response) {
		System.out.println("Inside CheckSession method");
		if(request.getHeader("x-auth-token") != null &&
				!request.getHeader("x-auth-token").isEmpty() )
		{
			return new ResponseEntity("Session Active",HttpStatus.OK);
		}
		else {
			return new ResponseEntity("Session Not Active",HttpStatus.FORBIDDEN);
			
		}
	}
	@RequestMapping(value="/user/logout", method =RequestMethod.POST)
	public ResponseEntity<String> logout() {
		SecurityContextHolder.clearContext();
		return new ResponseEntity<String>("Logout Successful!", HttpStatus.OK);
	}
	
	
}
