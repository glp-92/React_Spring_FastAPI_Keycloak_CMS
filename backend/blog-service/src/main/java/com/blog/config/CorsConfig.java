package com.blog.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.beans.factory.annotation.Value;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

	@Value("${front-origin}")
	private String frontendOrigin;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
    	registry.addMapping("/**")
	        .allowedOrigins(frontendOrigin)
	        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
	        .allowCredentials(true)  // Permitir el intercambio de credenciales (cookies)
	        .allowedHeaders("*");
    }
}