package gearfifth.com.example.controllers;


import gearfifth.com.example.dtos.images.ImageDetailsResponse;
import gearfifth.com.example.models.shared.Image;
import gearfifth.com.example.shared.IImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/v1/images")
public class ImageController {
    private final IImageService service;

    @PostMapping("/upload")
    public ResponseEntity<ImageDetailsResponse> uploadImage(
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "relativePath", required = false) String relativePath) {

        return ResponseEntity.status(201).body(service.uploadImage(file, relativePath != null ? relativePath : ""));
    }

    @GetMapping("/{id}")
    public ResponseEntity<byte[]> getImage(@PathVariable UUID id) {
        byte[] imageBytes = service.getImageBytes(id);
        String contentType = "image/jpeg";

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_TYPE, contentType)
                .body(imageBytes);
    }
}
