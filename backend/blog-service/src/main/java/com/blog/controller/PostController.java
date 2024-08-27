package com.blog.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.blog.model.pojo.Post;
import com.blog.model.dto.post.PostCreate;
import com.blog.model.dto.post.PostEdit;
import com.blog.service.PostService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/blog")
public class PostController {
	
	private final PostService service;
	
	@GetMapping("/post")
	public ResponseEntity<Map<String, Object>> getFilteredPosts (
			@RequestParam(name = "keyword", required = false) String keyword,
			@RequestParam(name = "category", required = false) String category,
			@RequestParam(name = "theme", required = false) String theme,
			@RequestParam(name = "page", required = true) int page,
			@RequestParam(name = "reverse", required = false) boolean reverse,
			@RequestParam(name = "perpage", required = false) Integer perpage
			) {
		try {
			if (keyword != null) { //Inyeccion de comandos y control de entrada
				if (keyword.length() > 20 || !keyword.matches("[\\w,]+")) {
		            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		        }
			}
			Map<String, Object> posts = service.getPostsFiltered(keyword, category, theme, page, reverse, perpage);
			if (!posts.isEmpty()) {
	            return ResponseEntity.status(HttpStatus.OK).body(posts); // Devuelve totalpages, y content
	        } else {
	            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
	        }
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
	
	@GetMapping("/post/{postSlug}")
	public ResponseEntity<Post> getPostByUri (
			@PathVariable String postSlug) {
		try {
			Post post = service.getPostByUri(postSlug);
			if (post != null) {
				return ResponseEntity.status(HttpStatus.OK).body(post);
			} 
			else {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
			}
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
	
	@PostMapping("/post")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<Post> createPost (
			@RequestBody PostCreate request) {
		try {
			Jwt user = (Jwt) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
	    	String subject = user.getClaimAsString("sub");
			Post post = service.createPost(request, subject);
			return ResponseEntity.status(HttpStatus.CREATED).body(post);
		} catch (Exception e) {
			System.err.println("Error: " + e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
	
	@PutMapping("/post")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<Post> editPost (
			@RequestBody PostEdit request) {
		try {
			Post post = service.editPost(request);
			if (post != null) {
				return ResponseEntity.status(HttpStatus.OK).body(post);
			} 
			else {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
			}
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
	
	@DeleteMapping("/post/{postId}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<String> deletePost (
			@PathVariable String postId) {
		try {
            boolean deleted = service.deletePost(postId);
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
