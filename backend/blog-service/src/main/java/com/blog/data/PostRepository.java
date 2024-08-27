package com.blog.data;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.blog.model.pojo.Category;
import com.blog.model.pojo.Post;
import com.blog.model.pojo.Theme;

public interface PostRepository extends JpaRepository<Post, Long>{
	List<Post> findByCategoriesContaining(Category category);
	List<Post> findByThemesContaining(Theme theme);
	List<Post> findByTitleContainingOrContentContainingIgnoreCase(String keyTitle, String keyContent);
	List<Post> findByCategoriesContainingAndTitleContainingOrContentContainingIgnoreCase(Category category, String keyTitle, String keyContent);
	Page<Post> findAllByIdIn(Iterable<Long> postIds, Pageable pageable);
	Post findBySlug(String postSlug);
}
