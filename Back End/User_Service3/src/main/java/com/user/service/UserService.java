package com.user.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.user.pojo.PasswordStrengthResponse;
import com.user.pojo.User;
import com.user.repo.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private RestTemplate restTemplate;

    private final String passwordStrengthServiceUrl = "http://localhost:8082/api/password/evaluate";

    public void registerUser(String username, String password) {
        // Check if username or password is null
        if (username == null || username.isEmpty() || password == null || password.isEmpty()) {
            throw new IllegalArgumentException("Username and password cannot be null");
        }

        // Check if username already exists
        if (userRepository.findByUsername(username).isPresent()) {
            throw new IllegalArgumentException("Username already exists");
        }

        // Encode password and save user
        String hashedPassword = passwordEncoder.encode(password);
        User user = new User();
        user.setUsername(username);
        user.setPassword(hashedPassword);
        userRepository.save(user);
    }
    
    public PasswordStrengthResponse evaluatePasswordStrength(String password) {
        PasswordStrengthResponse response = restTemplate.getForObject(
            passwordStrengthServiceUrl + "?password=" + password,
            PasswordStrengthResponse.class
        );
        return response;
    }
    
    public void authenticateUser(String username, String password) {
        // Check if username or password is null or empty
        if (username == null || username.isEmpty() || password == null || password.isEmpty()) {
            throw new IllegalArgumentException("Please enter both username and password");
        }

        User user = userRepository.findByUsername(username)
            .orElseThrow(() -> new IllegalArgumentException("Invalid username"));

        // Check if password matches
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new IllegalArgumentException("Incorrect password");
        }
    }
}

