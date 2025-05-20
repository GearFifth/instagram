package gearfifth.com.example.exceptions;

public class EmailAlreadyExistsException extends RuntimeException {
    private static final String DEFAULT_MESSAGE = "Email already in use.";
    private static final String CUSTOM_MESSAGE = "Email %s already in use.";

    public EmailAlreadyExistsException() {
        super(DEFAULT_MESSAGE);
    }

    public EmailAlreadyExistsException(String email) {
        super(String.format(CUSTOM_MESSAGE, email));
    }

    public EmailAlreadyExistsException(String message, boolean isCustom) {
        super(message);
    }
}