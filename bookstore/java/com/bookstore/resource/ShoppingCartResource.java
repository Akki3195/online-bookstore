package com.bookstore.resource;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.bookstore.domain.Book;
import com.bookstore.domain.CartItem;
import com.bookstore.domain.ShoppingCart;
import com.bookstore.domain.User;
import com.bookstore.service.BookService;
import com.bookstore.service.CartItemService;
import com.bookstore.service.ShoppingCartService;
import com.bookstore.service.UserService;

@RestController
@RequestMapping("/cart")
public class ShoppingCartResource {
	@Autowired
	private UserService userService;
	
	@Autowired
	private BookService bookService;
	
	@Autowired
	private CartItemService cartItemService;
	
	@Autowired
	private ShoppingCartService shoppingCartService;
	
	@RequestMapping("/add")
	public ResponseEntity<String> addItem(
			@RequestBody HashMap<String, String> mapper, Principal principal){
		
		String bookId = (String) mapper.get("bookId");
		String qty = (String) mapper.get("qty");
		
		User user = userService.findByUsername(principal.getName());
		Optional<Book> book = bookService.findOne(Long.parseLong(bookId));
		
		if(Integer.parseInt(qty) > book.get().getInStockNumber()){
			return new ResponseEntity<String>("Not Enough Stock", HttpStatus.BAD_REQUEST);
		}
		
		CartItem cartItem = cartItemService.addBookToCartItem(book.get(), user, Integer.parseInt(qty));
		if(cartItem != null) {
		return new ResponseEntity<String>("Book Added Successfully", HttpStatus.OK);
		}
		else {
			return new ResponseEntity<String>("Failed to add book", HttpStatus.OK);
		}
	}
	
	@RequestMapping("/getCartItemList")
	public List<CartItem> getCartItemList(Principal principal){
		User user = userService.findByUsername(principal.getName());
		ShoppingCart shoppingCart = user.getShoppingCart();
		
		List<CartItem> cartItemList = cartItemService.findByShoppingCart(shoppingCart);
		if(cartItemList != null) {
			shoppingCartService.updateShoppingCart(shoppingCart,user);
		}
		return cartItemList;
	}
	
	@RequestMapping("/getShoppingCart")
	public ShoppingCart getShoppingCart(Principal principal) {
		User user = userService.findByUsername(principal.getName());
		ShoppingCart shoppingCart = user.getShoppingCart();
		if(shoppingCart != null) {
			shoppingCartService.updateShoppingCart(shoppingCart,user);
		}
		return shoppingCart;
	}
	
	@RequestMapping(value = "/removeCartItem", method = RequestMethod.POST)
	public ResponseEntity<String> removeItem(@RequestBody String id){
		cartItemService.removeCartItem(cartItemService.findById(Long.parseLong(id)));
		
		return new ResponseEntity<String>("Cart Item Removed Successfully", HttpStatus.OK);
	}
	
	@RequestMapping(value = "/updateCartItem", method = RequestMethod.POST)
	public ResponseEntity<String> updateCartItem(@RequestBody HashMap<String, String> mapper){
		System.out.println("inside update cart item method");
		String cartItemId= mapper.get("cartItemId");
		String qty = mapper.get("qty");
		if(cartItemId != null) {
			CartItem cartItem = cartItemService.findById(Long.parseLong(cartItemId));
			cartItem.setQty(Integer.parseInt(qty));
			cartItemService.updateCartItem(cartItem);
			return new ResponseEntity<String>("Cart Item Updated Succssfully", HttpStatus.OK);
		}
		else {
			return new ResponseEntity<String>("Cart Item Update failed", HttpStatus.BAD_GATEWAY);
		}
		
		
	}
}
