package com.blog.service;

import java.util.List;
import java.util.Map;

import com.blog.model.pojo.Category;
import com.blog.model.dto.category.CategoryCreate;
import com.blog.model.dto.category.CategoryEdit;

public interface CategoryService {
	List<Category> getAllCategories();
	Map<String, Object> getAllCategoriesPageable(int page, Integer perpage);
	Category getCategoryByName(String categoryName);
	Category createCategory(CategoryCreate request);
	Category editCategory(CategoryEdit request);
	boolean deleteCategory(String categoryId);
}
