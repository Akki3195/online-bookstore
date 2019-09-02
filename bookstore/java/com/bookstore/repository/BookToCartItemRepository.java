package com.bookstore.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import com.bookstore.domain.BookToCartItem;
import com.bookstore.domain.CartItem;

public interface BookToCartItemRepository extends CrudRepository<BookToCartItem, Long>{
	
	@Transactional
	public void deleteByCartItem(CartItem cartItem);

}
