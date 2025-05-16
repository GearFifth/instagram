package gearfifth.com.example.instagram.exceptions;

import java.util.UUID;

public class UserNotFoundException extends RuntimeException {
    private static final String DEFAULT_MESSAGE = "User not found.";
    private static final String MESSAGE_BY_ID = "User with ID %s not found.";
    private static final String MESSAGE_BY_EMAIL = "User with email %s not found.";

    public UserNotFoundException() {
        super(DEFAULT_MESSAGE);
    }

    public UserNotFoundException(UUID userId) {
        super(String.format(MESSAGE_BY_ID, userId));
    }

    public UserNotFoundException(String email) {
        super(String.format(MESSAGE_BY_EMAIL, email));
    }

    public UserNotFoundException(String message, boolean isCustom) {
        super(message);
    }
}