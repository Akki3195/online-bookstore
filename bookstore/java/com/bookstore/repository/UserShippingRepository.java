package com.bookstore.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.bookstore.domain.UserShipping;

public interface UserShippingRepository extends CrudRepository<UserShipping, Long>{
	
	@Query("from UserShipping a where a.user.id=:userId")
	public List<UserShipping> findListByUserId(Long userId);
}
