package gearfifth.com.example.instagram.exceptions;

public class EmailAlreadyExistsException extends RuntimeException {
    private static final String DEFAULT_MESSAGE = "Email already in use.";
    private static final String CUSTOM_MESSAGE = "Email %s already in use.";

    public EmailAlreadyExistsException() {
        super("Email already in use.");
    }

    public EmailAlreadyExistsException(String email) {
        super("Email " + email + " already in use.");
    }

    public EmailAlreadyExistsException(String message, boolean isCustom) {
        super(message);
    }
}