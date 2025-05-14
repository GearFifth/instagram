package gearfifth.com.example.instagram.exceptions;

import gearfifth.com.example.instagram.models.User;

import java.util.UUID;

public class UserNotFoundException extends RuntimeException {
    private static final String DEFAULT_MESSAGE = "User not found.";

    public UserNotFoundException() {
        super("User not found.");
    }

    public UserNotFoundException(UUID userId) {
        super("User with ID " + userId + " not found.");
    }

    public UserNotFoundException(String email) {
        super("User with email " + email + " not found.");
    }

    public UserNotFoundException(String message, boolean isCustom) {
        super(message);
    }
}