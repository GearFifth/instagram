package gearfifth.com.example.images;

import gearfifth.com.example.dtos.images.ImageDetailsResponse;
import gearfifth.com.example.exceptions.FileStorageException;
import gearfifth.com.example.models.shared.Image;
import gearfifth.com.example.repositories.shared.IImageRepository;
import gearfifth.com.example.utils.IFileService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ImageService implements IImageService {
    private final IImageRepository imageRepository;
    private final IFileService fileService;
    private final ModelMapper mapper;
    private final String UPLOAD_DIR = "images";

    @Override
    @Transactional
    public ImageDetailsResponse uploadImage(MultipartFile file, String relativePath) {
        String originalFileName = file.getOriginalFilename();
        String type = originalFileName.substring(originalFileName.lastIndexOf('.') + 1);
        UUID generatedId = UUID.randomUUID();
        String path = UPLOAD_DIR + File.separator + relativePath + File.separator + generatedId + "." + type;

        fileService.saveFile(file, path);

        Image image = new Image();
        image.setId(generatedId);
        image.setPath(path);
        image.setOriginalName(originalFileName);

        return mapper.map(imageRepository.save(image), ImageDetailsResponse.class);
    }

    @Override
    public byte[] getImageBytes(UUID imageId) {
        Image image = getImageDetails(imageId);
        Resource resource = fileService.getFile(image.getPath());

        try (InputStream is = resource.getInputStream()) {
            return is.readAllBytes();
        } catch (IOException e) {
            throw new FileStorageException("Could not read image file", e);
        }
    }

    @Override
    public Resource getImage(UUID imageId) {
        Image image = getImageDetails(imageId);
        return fileService.getFile(image.getPath());
    }

    @Override
    public Image getImageDetails(UUID imageId) {
        return imageRepository.findById(imageId)
                .orElseThrow(() ->new ResponseStatusException(HttpStatus.NOT_FOUND, "Image not found"));
    }

    @Override
    @Transactional
    public void removeImage(UUID imageId) {
        Image image = getImageDetails(imageId);
        fileService.removeFile(image.getPath());
        imageRepository.delete(image);
    }

}
