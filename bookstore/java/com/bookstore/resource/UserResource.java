package com.bookstore.resource;

import java.security.Principal;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.bookstore.config.SecurityConfig;
import com.bookstore.config.SecurityUtility;
import com.bookstore.domain.User;
import com.bookstore.domain.security.Role;
import com.bookstore.domain.security.UserRole;
import com.bookstore.service.UserService;
import com.bookstore.utility.MailConstructor;

@RestController
@RequestMapping("/user")
public class UserResource {
	@Autowired
	UserService userService;
	
	@Autowired
	private MailConstructor mailConstructor;
	
	@Autowired
	private JavaMailSender mailSender;
	
	@RequestMapping(value="/newUser",method=RequestMethod.POST)
	public ResponseEntity<String> newUserPost(HttpServletRequest request,
							@RequestBody HashMap<String, String> mapper) throws Exception{
		String username = mapper.get("username");
		String userEmail = mapper.get("email");
		System.out.println("inside new user method");
		if(userService.findByUsername(username) != null) {
			return new ResponseEntity<String>("Username Exists",HttpStatus.BAD_REQUEST);
		}
		if(userService.findByEmail(userEmail) != null) {
			return new ResponseEntity<String>("Email Exists",HttpStatus.BAD_REQUEST);
		}
		
		User user = new User();
		user.setUserName(username);
		user.setEmail(userEmail);
		
		String password = SecurityUtility.randomPassword();
		
		String encryptedPassword =SecurityUtility.passwordEncoder().encode(password);
		user.setPassword(encryptedPassword);
		
		Role role = new Role();
		role.setRoleId(1);
		role.setName("ROLE_USER");
		Set<UserRole> userRoles = new HashSet<>();
		userRoles.add(new UserRole(user,role));
		userService.createUser(user, userRoles);
		
		SimpleMailMessage email = mailConstructor.constructNewUserEmail(user,password);
		mailSender.send(email);
		
		return new ResponseEntity<String>("User Added Succefully",HttpStatus.OK);
	}
	
	@RequestMapping(value="/forgetPassword",method=RequestMethod.POST)
	public ResponseEntity<String> forgetPassword(HttpServletRequest request,
							@RequestBody HashMap<String, String> mapper) throws Exception{

		User user = userService.findByEmail(mapper.get("email"));
		
		if(user == null) {
			return new ResponseEntity<String>("Email not found",HttpStatus.BAD_REQUEST);
		}
		
		String password = SecurityUtility.randomPassword();
		
		String encryptedPassword =SecurityUtility.passwordEncoder().encode(password);
		user.setPassword(encryptedPassword);
		userService.save(user);
		
		SimpleMailMessage newEmail = mailConstructor.constructNewUserEmail(user,password);
		mailSender.send(newEmail);
		
		return new ResponseEntity<String>("Email sent succefully",HttpStatus.OK);
	}
	
	@RequestMapping(value="/updateUserInfo",method=RequestMethod.POST)
	public ResponseEntity<String> profileInfo(@RequestBody HashMap<String,Object> mapper) throws Exception{
		
		int id = (Integer) mapper.get("id");
		String email = (String) mapper.get("email");
		String username = (String) mapper.get("userName");
		String firstName = (String) mapper.get("firstName");
		String lastName = (String) mapper.get("lastName");
		String newPassword = (String) mapper.get("newPassword");
		String currentPassword = (String) mapper.get("currentPassword");
		User currentUser = null;
		
		Optional<User> currUser = userService.findById(Long.valueOf(id));
		if(currUser == null) {
			throw new Exception("user not found");
		}
		else {
			currentUser  = currUser.get();
		}
		if(userService.findByEmail(email) != null) {
			if(userService.findByEmail(email).getId() != currentUser.getId()) {
				return new ResponseEntity<String>("Email not found",HttpStatus.BAD_REQUEST);
			}
		}
		if(userService.findByUsername(username) != null) {
			if(userService.findByUsername(username).getId() != currentUser.getId()) {
				return new ResponseEntity<String>("Username not found",HttpStatus.BAD_REQUEST);
			}
		}
		SecurityConfig securityConfig = new SecurityConfig();
		
		if(newPassword != null && !newPassword.isEmpty() && !newPassword.equals("")) {
			BCryptPasswordEncoder passwordEncoder = SecurityUtility.passwordEncoder();
			String encryptedCurrentPassword =  passwordEncoder.encode(currentPassword);
			String dbPassword = currentUser.getPassword();
			if(encryptedCurrentPassword.equals(dbPassword)){
				currentUser.setPassword(passwordEncoder.encode(newPassword));
			}
			else {
				return new ResponseEntity<String>("Incorrect current Password",HttpStatus.BAD_REQUEST);
			}
		}
		
		currentUser.setFirstName(firstName);
		currentUser.setLastName(lastName);
		currentUser.setUserName(username);
		currentUser.setEmail(email);
		
		if(userService.save(currentUser)!= null) {
			return new ResponseEntity<String>("Update Success",HttpStatus.OK);
		}
		
		return new ResponseEntity<String>("Update Failed",HttpStatus.INTERNAL_SERVER_ERROR);
		
	}
	
	@RequestMapping("/getCurrentUser")
	public User getCurrentUser(Principal principal) {
		User user = new User();
		if(principal != null) {
			user = userService.findByUsername(principal.getName());
			return user;
		}
		else {
			return user;
		}
		
	}
	
}
