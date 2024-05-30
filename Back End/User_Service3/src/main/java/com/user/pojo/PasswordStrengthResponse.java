package com.user.pojo;

import java.util.List;

public class PasswordStrengthResponse {
    private int score;
    private String description;
    private List<String> suggestions;

    public List<String> getSuggestions() {
		return suggestions;
	}

	public void setSuggestions(List<String> suggestions) {
		this.suggestions = suggestions;
	}

	public PasswordStrengthResponse(int score, String description) {
        this.score = score;
        this.description = description;
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

    // Getters and Setters
}
