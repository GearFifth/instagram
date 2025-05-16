package gearfifth.com.example.instagram.services.shared;

import gearfifth.com.example.instagram.dtos.images.ImageDetailsResponse;
import gearfifth.com.example.instagram.models.shared.Image;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;

import java.io.IOException;
import java.util.UUID;

public interface IImageService {
    ImageDetailsResponse uploadImage(MultipartFile file, String relativePath);
    Resource getImage(UUID imageId);
    public byte[] getImageBytes(UUID imageId);
    Image getImageDetails(UUID imageId);
    void removeImage(UUID imageId);
}
