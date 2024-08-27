package com.blog.service;

import org.springframework.security.oauth2.jwt.Jwt;

import com.blog.model.dto.auth.LoginRequest;
import com.blog.model.dto.auth.LoginResponse;

public interface AuthService {
	LoginResponse login(LoginRequest request);
	LoginResponse refreshToken(String refresh_token);
	boolean revokeToken(String refresh_token);
	boolean createUserEntityIfNotExists(Jwt user);
}
