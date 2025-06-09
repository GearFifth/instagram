package gearfifth.com.example.utils;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;


public interface IFileService {
    Resource getFile(String filePath);
    String saveFile(MultipartFile file, String relativePath);
    void removeFile(String filePath);
}
