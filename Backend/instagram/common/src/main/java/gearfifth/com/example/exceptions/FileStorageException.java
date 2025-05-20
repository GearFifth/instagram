package gearfifth.com.example.exceptions;

public class FileStorageException extends RuntimeException {
  public FileStorageException(String message, Throwable cause) {
    super(message, cause);
  }
}