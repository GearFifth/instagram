package gearfifth.com.example.instagram.exceptions;

import java.util.UUID;

public class CommentNotFoundException extends RuntimeException {
  private static final String DEFAULT_MESSAGE = "Comment not found.";
  private static final String MESSAGE_BY_ID = "Comment with ID %s not found.";

  public CommentNotFoundException() {
    super(DEFAULT_MESSAGE);
  }

  public CommentNotFoundException(UUID commentId) {
    super(String.format(MESSAGE_BY_ID, commentId));
  }

  public CommentNotFoundException(String message, boolean isCustom) {
    super(message);
  }
}
