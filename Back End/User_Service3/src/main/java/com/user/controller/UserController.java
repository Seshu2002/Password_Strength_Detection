package com.user.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.user.pojo.PasswordStrengthResponse;
import com.user.pojo.User;
import com.user.pojo.UserLoginRequest;
import com.user.service.UserService;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<Object> registerUser(@RequestBody User user) {
        ResponseEntity<Object> response;
        try {
            PasswordStrengthResponse passwordStrengthResponse = userService.evaluatePasswordStrength(user.getPassword());
            userService.registerUser(user.getUsername(), user.getPassword());
            String successMessage = "User registered successfully";
            Map<String, Object> responseBody = new HashMap<>();
            responseBody.put("message", successMessage);
            responseBody.put("passwordStrengthScore", passwordStrengthResponse.getScore());
            responseBody.put("passwordStrengthDescription", passwordStrengthResponse.getDescription());
            responseBody.put("passwordStrengthSuggestions", passwordStrengthResponse.getSuggestions());
            response = ResponseEntity.ok(responseBody);
        } catch (IllegalArgumentException e) {
            response = ResponseEntity.badRequest().body(e.getMessage());
        }
        return response;
    }
    
    @PostMapping("/register/evaluate")
    public ResponseEntity<PasswordStrengthResponse> evaluatePasswordStrength(@RequestBody Map<String, String> request) {
        String password = request.get("password");
        PasswordStrengthResponse response = userService.evaluatePasswordStrength(password);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody UserLoginRequest loginRequest) {
        try {
            userService.authenticateUser(loginRequest.getUsername(), loginRequest.getPassword());
            return ResponseEntity.ok("Login successful");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }
}
