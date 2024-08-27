package com.blog.data;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.blog.model.pojo.Theme;


public interface ThemeRepository extends JpaRepository<Theme, Long> {
	Theme findByName(String name);
	List<Theme> findAllById(Iterable<Long> ids);
	
	@Query(
	    value = "select t from Theme t left join t.posts p group by t Order By count(p) desc",
	    countQuery = "select count(t) from Theme t"
    )
    Page<Theme> findAllOrderByAddressCountDesc(Pageable pageable);
}
