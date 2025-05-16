package gearfifth.com.example.instagram.exceptions;

import java.util.UUID;

public class PostNotFoundException extends RuntimeException {
    private static final String DEFAULT_MESSAGE = "Post not found.";
    private static final String MESSAGE_BY_ID = "Post with ID %s not found.";

    public PostNotFoundException() {
        super(DEFAULT_MESSAGE);
    }

    public PostNotFoundException(UUID postId) {
        super(String.format(MESSAGE_BY_ID, postId));
    }

    public PostNotFoundException(String message, boolean isCustom) {
        super(message);
    }
}
