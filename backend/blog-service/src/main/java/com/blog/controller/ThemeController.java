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

import com.blog.model.pojo.Theme;
import com.blog.model.dto.theme.ThemeCreate;
import com.blog.model.dto.theme.ThemeEdit;
import com.blog.service.ThemeService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/blog")
public class ThemeController {
	
	private final ThemeService service;
	
	@GetMapping("/theme")
	//@CrossOrigin
	public ResponseEntity<Object> getThemes (
			@RequestParam(required = false) String name,
			@RequestParam(name = "page", required = false) Integer page,
			@RequestParam(name = "perpage", required = false) Integer perpage) {
		try {
			if (page == null) {
				List<Theme> themes = new ArrayList<>();
				if (name != null) {
					Theme theme = service.getThemeByName(name);
					themes.add(theme);
				}
				else {
					themes = service.getAllThemes();
				}
				if (themes.isEmpty()) {
					return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
				} else {
				return ResponseEntity.status(HttpStatus.OK).body(themes);
				} 
			} else {
				Map<String, Object> themes = service.getAllThemesPageable(page, perpage);
				if (themes != null && !themes.isEmpty()) {
	                return ResponseEntity.status(HttpStatus.OK).body(themes);
	            } else {
	                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
	            }
	        }
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
	
	@PostMapping("/theme")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<Theme> createTheme (
			@RequestBody ThemeCreate request) {
		try {
			Theme theme = service.createTheme(request);
			return ResponseEntity.status(HttpStatus.CREATED).body(theme);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
	
	@PutMapping("/theme")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<Theme> editTheme (
			@RequestBody ThemeEdit request) {
		try {
			Theme theme = service.editTheme(request);
			if (theme != null) {
				return ResponseEntity.status(HttpStatus.OK).body(theme);
			}
			else {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
			}
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
	
	@DeleteMapping("/theme/{themeId}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<String> deleteTheme (
			@PathVariable String themeId) {
		try {
            boolean deleted = service.deleteTheme(themeId);
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
