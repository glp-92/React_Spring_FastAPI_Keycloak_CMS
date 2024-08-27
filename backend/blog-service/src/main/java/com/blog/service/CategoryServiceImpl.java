package com.blog.service;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.blog.data.CategoryRepository;
import com.blog.model.pojo.Category;
import com.blog.model.pojo.Post;
import com.blog.model.dto.category.CategoryCreate;
import com.blog.model.dto.category.CategoryEdit;

@Service
public class CategoryServiceImpl implements CategoryService {
	
	@Autowired
	private CategoryRepository repository;
	
	@Override
	public List<Category> getAllCategories() {
		return repository.findAll();
	}
	
	@Override
	public Map<String, Object> getAllCategoriesPageable(int page, Integer perpage) {
		if (perpage == null) {
			perpage = 20;
		}
		Sort.Direction direction = Sort.Direction.ASC;
		Pageable pageable = PageRequest.of(page, perpage, Sort.by(direction, "name"));
		// Page<Category> pageResult = repository.findAll(pageable);
		Page<Category> pageResult = repository.findAllOrderByAddressCountDesc(pageable);
		int totalPages = pageResult.getTotalPages();
		Map<String, Object> response = new HashMap<>();
	    response.put("totalPages", totalPages);
	    response.put("content", pageResult.getContent());
	    return response;
	}
	
	@Override
	public Category getCategoryByName(String categoryName) {
		return repository.findByName(categoryName);
	}

	@Override
	public Category createCategory(CategoryCreate request) {
		Set<Post> posts = new HashSet<Post>(); // No hashset para admitir duplicados
		Category category = Category.builder().name(request.getName()).slug(request.getSlug()).posts(posts).build();
		return repository.save(category);
	}

	@Override
	public Category editCategory(CategoryEdit request) {
		if (request.getId() != null) {
			Optional<Category> category_opt = repository.findById(Long.valueOf(request.getId()));
			if (category_opt.isEmpty()) {
	            return null;
	        }
			Category category = category_opt.get();
			if (request.getName() != null) {
				category.setName(request.getName());
			}
			if (request.getSlug() != null) {
				category.setSlug(request.getSlug());
			}
			return repository.save(category);
		}
		return null;
	}

	@Override
	public boolean deleteCategory(String categoryId) {
		if (repository.existsById(Long.valueOf(categoryId))) {
			repository.deleteById(Long.valueOf(categoryId));
			return !repository.existsById(Long.valueOf(categoryId));
	    } else {
	        return false;
	    }
	}

}
