package gearfifth.com.example.shared;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;


public interface IFileService {
    Resource getFile(String filePath);
    String saveFile(MultipartFile file, String relativePath);
    void removeFile(String filePath);
}
