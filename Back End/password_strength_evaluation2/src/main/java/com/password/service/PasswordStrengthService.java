package com.password.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.password.dto.PasswordStrengthResponse;

@Service
public class PasswordStrengthService {

    public PasswordStrengthResponse evaluatePasswordStrength(String password) {
        int score = 0;
        List<String> suggestions = new ArrayList<>();

        if (password.length() >= 8) score++;
        else suggestions.add("Add at least 8 characters");

        if (password.matches("(?=.*[0-9]).*")) score++;
        else suggestions.add("Add a number");

        if (password.matches("(?=.*[a-z]).*")) score++;
        else suggestions.add("Add a lowercase letter");

        if (password.matches("(?=.*[A-Z]).*")) score++;
        else suggestions.add("Add an uppercase letter");

        if (password.matches("(?=.*[!@#\\$%\\^&\\*]).*")) score++;
        else suggestions.add("Add a special character");

        String description;
        switch (score) {
            case 0: description = "Very very weak"; break;
            case 1: description = "Very weak"; break;
            case 2: description = "Weak"; break;
            case 3: description = "Medium"; break;
            case 4: description = "Strong"; break;
            case 5: description = "Very Strong"; break;
            default: description = "default - Weak"; break;
        }

        return new PasswordStrengthResponse(score, description, suggestions);
    }
}
