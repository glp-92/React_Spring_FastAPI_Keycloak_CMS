package com.blog.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.blog.model.pojo.Category;
import com.blog.model.dto.category.CategoryCreate;
import com.blog.model.dto.category.CategoryEdit;
import com.blog.service.CategoryService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/blog")
public class CategoryController {
	
	private final CategoryService service;
	
	@GetMapping("/category")
	// @CrossOrigin
	public ResponseEntity<Object> getCategories (
			@RequestParam(required = false) String name,
			@RequestParam(name = "page", required = false) Integer page,
			@RequestParam(name = "perpage", required = false) Integer perpage) {
		try {
			if (page == null) {
				List<Category> categories = new ArrayList<>();
				if (name != null) {
					Category category = service.getCategoryByName(name);
					categories.add(category);
				}
				else {
					categories = service.getAllCategories();
				}
				if (categories != null) {
		            return ResponseEntity.status(HttpStatus.OK).body(categories);
		        } else {
		            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		        }
			} else {
				Map<String, Object> categories = service.getAllCategoriesPageable(page, perpage);
				if (categories != null && !categories.isEmpty()) {
	                return ResponseEntity.status(HttpStatus.OK).body(categories);
	            } else {
	                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
	            }
	        }
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
	
	@PostMapping("/category")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<Category> createCategory (
			@RequestBody CategoryCreate request) {
		try {
			Category category = service.createCategory(request);
			return ResponseEntity.status(HttpStatus.CREATED).body(category);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
	
	@PutMapping("/category")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<Category> editCategory (
			@RequestBody CategoryEdit request) {
		try {
			Category category = service.editCategory(request);
			if (category != null) {
				return ResponseEntity.status(HttpStatus.OK).body(category);
			}
			else {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
			}
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
	
	@DeleteMapping("/category/{categoryId}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<String> deleteCategory (
			@PathVariable String categoryId) {
		try {
            boolean deleted = service.deleteCategory(categoryId);
            if (deleted) {
            	return ResponseEntity.noContent().build();
            }
            else {
            	return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Not found");
        } 
	}

}
