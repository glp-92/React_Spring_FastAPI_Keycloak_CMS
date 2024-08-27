package com.blog.controller;

import java.time.Duration;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blog.model.dto.auth.LoginRequest;
import com.blog.model.dto.auth.LoginResponse;
import com.blog.service.AuthService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/blog")
public class AuthController {
	
	private final AuthService authService;
	
	@GetMapping("/valid")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<Void> validateToken() {
		Jwt user = (Jwt) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		boolean userEntityExists = authService.createUserEntityIfNotExists(user);
		if (!userEntityExists) {
			System.out.println("Creada nueva entidad de usuario");
		}
		return ResponseEntity.status(HttpStatus.OK).build();
	}
	
	@PostMapping("/login")
	//public ResponseEntity<LoginResponse> login(
	public ResponseEntity<Map<String, String>> login(
			@RequestBody LoginRequest request) {
		try {
			LoginResponse loginResponse = authService.login(request);
			if (loginResponse != null) {
				ResponseCookie cookie = ResponseCookie.from("refresh_token", loginResponse.getRefresh_token())
				        .httpOnly(true)  
				        .secure(true)
				        .path("/")
				        .maxAge(loginResponse.getRefresh_expiration_time())
				        .build();
				HttpHeaders headers = new HttpHeaders();
				headers.add(HttpHeaders.SET_COOKIE, cookie.toString());
				Map<String, String> responseBody = new HashMap<>();
		        responseBody.put("access_token", loginResponse.getAccess_token());
				return ResponseEntity.status(HttpStatus.OK).headers(headers).body(responseBody);
				//return ResponseEntity.status(HttpStatus.OK).headers(headers).body(loginResponse);
			}
			else {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
			}
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}
	}
	
	@PostMapping("/refresh")
	//public ResponseEntity<LoginResponse> tokenRefresh(
	public ResponseEntity<Map<String, String>> tokenRefresh(
			@CookieValue(name = "refresh_token") String refresh_token) {
		try {
			if (refresh_token != null) {
				LoginResponse loginResponse = authService.refreshToken(refresh_token);
				if (loginResponse != null) {
					ResponseCookie cookie = ResponseCookie.from("refresh_token", loginResponse.getRefresh_token())
					        .httpOnly(true)  
					        .secure(true)
					        .path("/")
					        .maxAge(loginResponse.getRefresh_expiration_time())
					        .build();
					HttpHeaders headers = new HttpHeaders();
					headers.add(HttpHeaders.SET_COOKIE, cookie.toString());
					Map<String, String> responseBody = new HashMap<>();
			        responseBody.put("access_token", loginResponse.getAccess_token());
					return ResponseEntity.status(HttpStatus.OK).headers(headers).body(responseBody);
					//return ResponseEntity.status(HttpStatus.OK).headers(headers).body(loginResponse);
				}
			}
			return ResponseEntity.status(HttpStatus.BAD_GATEWAY).build();
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
		
	}
	
	@PostMapping("/revoke")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<Void> tokenRevoke(
			@CookieValue(name = "refresh_token") String refresh_token) {
	    try {
	    	if (refresh_token != null) {
				boolean success = authService.revokeToken(refresh_token);
				if (success) {
					ResponseCookie cookie = ResponseCookie.from("refresh_token", null)
					        .httpOnly(true)  
					        .secure(true)
					        .path("/")
					        .maxAge(0)
					        .build();
					HttpHeaders headers = new HttpHeaders();
					headers.add(HttpHeaders.SET_COOKIE, cookie.toString());
		            return ResponseEntity.status(HttpStatus.NO_CONTENT).headers(headers).build();
				}
	    	}
	        return ResponseEntity.badRequest().build();
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
	    }
	}

			

}
