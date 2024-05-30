package com.password.dto;

import java.util.List;

public class PasswordStrengthResponse {
    private int score;
    private String description;
    private List<String> suggestions;

    // Constructors, getters, and setters
    public PasswordStrengthResponse(int score, String description, List<String> suggestions) {
        this.score = score;
        this.description = description;
        this.suggestions = suggestions;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<String> getSuggestions() {
        return suggestions;
    }

    public void setSuggestions(List<String> suggestions) {
        this.suggestions = suggestions;
    }
}
