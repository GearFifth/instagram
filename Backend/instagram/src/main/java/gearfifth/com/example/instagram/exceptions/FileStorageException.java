package gearfifth.com.example.instagram.exceptions;

public class FileStorageException extends RuntimeException {
  public FileStorageException(String message, Throwable cause) {
    super(message, cause);
  }
}