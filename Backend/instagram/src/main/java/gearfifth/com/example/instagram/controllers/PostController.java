package gearfifth.com.example.instagram.controllers;

import gearfifth.com.example.instagram.models.shared.Image;
import gearfifth.com.example.instagram.services.shared.IImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/v1/posts")
public class PostController {
//    private final IPostService service;

//    @PostMapping("/upload")
//    public ResponseEntity<UploadPostImageRequest> uploadImage(
//            @RequestParam("file") MultipartFile file,
//            @RequestParam("postId") Long postId) {
//
//        if (file.isEmpty()) {
//            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//        }
//
//        try {
//            Post post = postService.get(postId);
//            Image savedImage = service.uploadImage(file, post);
//            return new ResponseEntity<>(mapper.map(savedImage, ImageDTO.class), HttpStatus.CREATED);
//
//        } catch (IOException e) {
//            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
}