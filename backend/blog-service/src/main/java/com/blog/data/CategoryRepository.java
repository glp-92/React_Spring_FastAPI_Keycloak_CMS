package com.blog.data;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.blog.model.pojo.Category;


public interface CategoryRepository extends JpaRepository<Category, Long> {
	Category findByName(String name);
	List<Category> findAllById(Iterable<Long> ids);
	
	@Query(
	    value = "select c from Category c left join c.posts p group by c Order By count(p) desc",
	    countQuery = "select count(c) from Category c"
    )
    Page<Category> findAllOrderByAddressCountDesc(Pageable pageable);
}
