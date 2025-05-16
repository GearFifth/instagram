package gearfifth.com.example.instagram.services.shared;

import gearfifth.com.example.instagram.exceptions.FileStorageException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.*;

@Service
public class FileService implements IFileService {
    private final Path fileStorageLocation = Paths.get("files").toAbsolutePath().normalize();

    public FileService() throws IOException {
        Files.createDirectories(fileStorageLocation);
    }

    @Override
    public Resource getFile(String filePath) {
        try {
            Path file = fileStorageLocation.resolve(filePath).normalize();
            Resource resource = new UrlResource(file.toUri());
            if (resource.exists() && resource.isReadable()) {
                return resource;
            } else {
                throw new FileStorageException("File not found or not readable: " + filePath, new Exception());
            }
        } catch (MalformedURLException e) {
            throw new FileStorageException("Error reading file: " + filePath, e);
        }
    }

    @Override
    public String saveFile(MultipartFile file, String relativePath) {
        Path fullPath = fileStorageLocation.resolve(relativePath).normalize();
        Path directoryPath = fullPath.getParent();

        try {
            if (directoryPath != null && !Files.exists(directoryPath)) {
                Files.createDirectories(directoryPath);
            }
            Files.copy(file.getInputStream(), fullPath, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            throw new FileStorageException("Failed to save file at path: " + fullPath, e);
        }

        return fullPath.toString();
    }

    @Override
    public void removeFile(String filePath){
        try {
            Path file = fileStorageLocation.resolve(filePath).normalize();
            Files.deleteIfExists(file);
        } catch (IOException e) {
            System.err.println("Failed to delete file: " + filePath + " - " + e.getMessage());
            throw new FileStorageException("Error deleting file: " + filePath, e);
        }
    }
}
