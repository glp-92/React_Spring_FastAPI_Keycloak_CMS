package com.blog.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import com.blog.data.UserRepository;
import com.blog.model.dto.auth.LoginRequest;
import com.blog.model.dto.auth.LoginResponse;
import com.blog.model.pojo.User;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class AuthServiceImpl implements AuthService{
	
	@Value("${spring.security.oauth2.resourceserver.jwt.client-secret}")
	private String clientSecret;
	
	@Value("${spring.security.oauth2.resourceserver.jwt.token-uri}")
	private String tokenUri;
	
	@Value("${spring.security.oauth2.resourceserver.jwt.revoke-token-uri}")
	private String revokeTokenUri;
	
	@Value("${jwt.auth.converter.resource-id}")
	private String clientId;
	
	@Autowired 
	private RestTemplate restTemplate;
	
	@Autowired
	private UserRepository userRepo;
	
	private final ObjectMapper objectMapper = new ObjectMapper();

	@Override
	public LoginResponse login(LoginRequest request) {
		
		MultiValueMap<String, String> formData = new LinkedMultiValueMap<>();
	    formData.add("grant_type", "password");
	    formData.add("client_id", clientId);
	    formData.add("client_secret", clientSecret);
	    formData.add("username", request.getUsername());
	    formData.add("password", request.getPassword());
	    //Otp from authenticator
	    formData.add("totp", request.getTotp());
	    HttpHeaders headers = new HttpHeaders();
	    headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
	    
	    HttpEntity<MultiValueMap<String, String>> entity = new HttpEntity<>(formData, headers);
	    try {
	    	ResponseEntity<String> response = restTemplate.postForEntity(tokenUri, entity, String.class);
		    if (response.getStatusCode() == HttpStatus.OK) {
		        String responseBody = response.getBody();
		        // System.out.println(responseBody);
		        try {
		            JsonNode root = objectMapper.readTree(responseBody);
		            LoginResponse loginResponse = new LoginResponse(root.path("access_token").asText(), root.path("refresh_token").asText(), root.path("refresh_expires_in").asInt());
		            return loginResponse;
		        } catch (JsonProcessingException e) {
		            return null;
		        }
		    } else {
		        return null;
		    }
	    } catch (HttpClientErrorException e) {
	        if (e.getStatusCode() == HttpStatus.UNAUTHORIZED) {
	            throw e;
	        } else {
	            return null;
	        }
	    }
	}
	
	@Override
	public LoginResponse refreshToken(String refresh_token) {
		MultiValueMap<String, String> formData = new LinkedMultiValueMap<>();
	    formData.add("grant_type", "refresh_token");
	    formData.add("client_id", clientId);
	    formData.add("client_secret", clientSecret);
	    formData.add("refresh_token", refresh_token);
	    
	    HttpHeaders headers = new HttpHeaders();
	    headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
	    
	    HttpEntity<MultiValueMap<String, String>> entity = new HttpEntity<>(formData, headers);
	    String response = restTemplate.postForObject(tokenUri, entity, String.class);
	    JsonNode root;
	    try {
			root = objectMapper.readTree(response);
		} catch (JsonMappingException e) {
			return null;
		} catch (JsonProcessingException e) {
			return null;
		}
		LoginResponse loginResponse = new LoginResponse(root.path("access_token").asText(), root.path("refresh_token").asText(), root.path("refresh_expires_in").asInt());
		return loginResponse;
	}

	@Override
	public boolean revokeToken(String refresh_token) {
		MultiValueMap<String, String> formData = new LinkedMultiValueMap<>();
	    formData.add("client_id", clientId);
	    formData.add("client_secret", clientSecret);
	    formData.add("refresh_token", refresh_token);
	    
	    HttpHeaders headers = new HttpHeaders();
	    headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
	    
	    HttpEntity<MultiValueMap<String, String>> entity = new HttpEntity<>(formData, headers);
	    ResponseEntity<String> responseEntity = restTemplate.postForEntity(revokeTokenUri, entity, String.class);
	    
	    // HttpStatusCode statusCode = responseEntity.getStatusCode();
	    // System.out.println(statusCode);
	    return true;
	}

	@Override
	public boolean createUserEntityIfNotExists(Jwt user) {
		if (userRepo.existsBySub(user.getClaimAsString("sub")))
			return true;
		System.out.println(user.getClaimAsString("sub"));
		System.out.println(user.getClaimAsString("preferred_username"));
		User newUser = User.builder().sub(user.getClaimAsString("sub")).username(user.getClaimAsString("preferred_username")).build();
		userRepo.save(newUser);
		return false;
	}

}
