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

import com.blog.data.ThemeRepository;
import com.blog.model.pojo.Post;
import com.blog.model.pojo.Theme;
import com.blog.model.dto.theme.ThemeCreate;
import com.blog.model.dto.theme.ThemeEdit;

@Service
public class ThemeServiceImpl implements ThemeService {
	
	@Autowired
	private ThemeRepository repository;
	
	@Override
	public List<Theme> getAllThemes() {
		return repository.findAll();
	}

	@Override
	public Map<String, Object> getAllThemesPageable(int page, Integer perpage) {
		if (perpage == null) {
			perpage = 6;
		}
		Sort.Direction direction = Sort.Direction.ASC;
		Pageable pageable = PageRequest.of(page, perpage, Sort.by(direction, "name"));
		// Page<Theme> pageResult = repository.findAll(pageable);
		Page<Theme> pageResult = repository.findAllOrderByAddressCountDesc(pageable); // por relevancia (numero de posts)
		int totalPages = pageResult.getTotalPages();
		Map<String, Object> response = new HashMap<>();
	    response.put("totalPages", totalPages);
	    response.put("content", pageResult.getContent());
	    return response;
	}

	@Override
	public Theme getThemeByName(String themeName) {
		return repository.findByName(themeName);
	}

	@Override
	public Theme createTheme(ThemeCreate request) {
		Set<Post> posts = new HashSet<Post>(); // No hashset para admitir duplicados
		Theme theme = Theme.builder().name(request.getName()).slug(request.getSlug()).excerpt(request.getExcerpt()).featuredImage(request.getFeaturedImage()).posts(posts).build();
		return repository.save(theme);
	}

	@Override
	public Theme editTheme(ThemeEdit request) {
		if (request.getId() != null) {
			Optional<Theme> theme_opt = repository.findById(Long.valueOf(request.getId()));
			if (theme_opt.isEmpty()) {
	            return null;
	        }
			Theme theme = theme_opt.get();
			if (request.getName() != null) {
				theme.setName(request.getName());
			}
			if (request.getSlug() != null) {
				theme.setSlug(request.getSlug());
			}
			if (request.getExcerpt() != null) {
				theme.setExcerpt(request.getExcerpt());
			}
			if (request.getFeaturedImage() != null) {
				theme.setFeaturedImage(request.getFeaturedImage());
			}
			return repository.save(theme);
		}
		return null;
	}

	@Override
	public boolean deleteTheme(String themeId) {
		if (repository.existsById(Long.valueOf(themeId))) {
			repository.deleteById(Long.valueOf(themeId));
			return !repository.existsById(Long.valueOf(themeId));
	    } else {
	        return false;
	    }
	}

}
