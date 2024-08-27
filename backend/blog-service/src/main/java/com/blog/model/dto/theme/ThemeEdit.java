package com.blog.model.dto.theme;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ThemeEdit {
	private String id;
	private String name;
	private String slug;
	private String excerpt;
	private String featuredImage;
}
