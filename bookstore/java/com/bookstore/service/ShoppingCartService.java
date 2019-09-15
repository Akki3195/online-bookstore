package com.bookstore.service;

import com.bookstore.domain.ShoppingCart;
import com.bookstore.domain.User;

public interface ShoppingCartService {
	
	ShoppingCart updateShoppingCart(ShoppingCart shoppingCart,User user);
	
	void clearShoppingCart(ShoppingCart shoppingCart);

}
