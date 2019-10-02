package com.bookstore.service.impl;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bookstore.domain.Book;
import com.bookstore.domain.BookToCartItem;
import com.bookstore.domain.CartItem;
import com.bookstore.domain.ShoppingCart;
import com.bookstore.domain.User;
import com.bookstore.repository.BookToCartItemRepository;
import com.bookstore.repository.CartItemRepository;
import com.bookstore.repository.ShoppingCartRepository;
import com.bookstore.service.CartItemService;

@Service
public class CartItemServiceImpl implements CartItemService {
	@Autowired
	private CartItemRepository cartItemRepository;
	
	@Autowired
	private BookToCartItemRepository bookToCartItemRepository;
	
	@Autowired
	private ShoppingCartRepository shoppingCartRepository;
	
	@Override
	public CartItem addBookToCartItem(Book book, User user, int qty) {
		ShoppingCart shoppingCart = user.getShoppingCart();
		
		if (shoppingCart != null) {
			List<CartItem> cartItemList = findByShoppingCart(shoppingCart);

			/* If book is already in cartitem List then */
			for (CartItem cartItem : cartItemList) {
				if (book.getId() == cartItem.getBook().getId()) {
					cartItem.setQty(cartItem.getQty() + qty);
					cartItem.setSubtotal((new BigDecimal(book.getOurPrice()).multiply(new BigDecimal(qty)))
							.add(cartItem.getSubtotal()));
					cartItemRepository.save(cartItem);
					return cartItem;
				}
			}
		}
		else {
			shoppingCart = new ShoppingCart();
			shoppingCart.setGrandTotal(new BigDecimal(0));
			shoppingCart.setUser(user);
			shoppingCartRepository.save(shoppingCart);
		}
		CartItem cartItem = new CartItem();
		cartItem.setShoppingCart(shoppingCart);
		cartItem.setBook(book);
		cartItem.setQty(qty);
		cartItem.setSubtotal(new BigDecimal(book.getOurPrice()).multiply(new BigDecimal(qty)));
		
		cartItem = cartItemRepository.save(cartItem);
		
		BookToCartItem bookToCartItem = new BookToCartItem();
		bookToCartItem.setBook(book);
		bookToCartItem.setCartItem(cartItem);
		bookToCartItemRepository.save(bookToCartItem);
		return cartItem;
	}

	@Override
	public List<CartItem> findByShoppingCart(ShoppingCart shoppingCart) {
		
		return cartItemRepository.findByShoppingCart(shoppingCart);
	}

	@Override
	public CartItem updateCartItem(CartItem cartItem) {
		BigDecimal bigDecimal = new BigDecimal(cartItem.getBook().getOurPrice()).multiply(new BigDecimal(cartItem.getQty()));
		bigDecimal = bigDecimal.setScale(2, RoundingMode.HALF_EVEN);
		cartItem.setSubtotal(bigDecimal);

		cartItemRepository.save(cartItem);
		return cartItem;
	}

	@Override
	public void removeCartItem(CartItem cartItem) {
		bookToCartItemRepository.deleteByCartItem(cartItem);
		cartItemRepository.delete(cartItem);
	}

	@Override
	public CartItem findById(Long id) {
		Optional<CartItem> cartItem = cartItemRepository.findById(id);
		
		return cartItem.get();
	}
	
	public CartItem save(CartItem cartItem) {
		return cartItemRepository.save(cartItem);
	}
	
	/*
	 * public List<CartItem> findByOrder(Order order){ return
	 * cartItemRepository.findByOrder(order); }
	 */

}
