package com.password.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.password.dto.PasswordStrengthResponse;
import com.password.service.PasswordStrengthService;

@RestController
@RequestMapping("/api/password")
public class PasswordStrengthController {

    @Autowired
    private PasswordStrengthService service;

    @GetMapping("/evaluate")
    public PasswordStrengthResponse evaluatePasswordStrength(@RequestParam String password) {
        return service.evaluatePasswordStrength(password);
    }
}


