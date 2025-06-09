package gearfifth.com.example.images;

import gearfifth.com.example.dtos.images.ImageDetailsResponse;
import gearfifth.com.example.models.shared.Image;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;

import java.util.UUID;

public interface IImageService {
    Image uploadImage(MultipartFile file, String relativePath);
    Resource getImage(UUID imageId);
    public byte[] getImageBytes(UUID imageId);
    Image getImageDetails(UUID imageId);
    void removeImage(UUID imageId);
}
