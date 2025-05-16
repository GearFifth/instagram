package gearfifth.com.example.instagram.controllers;

import gearfifth.com.example.instagram.dtos.images.ImageDetailsResponse;
import gearfifth.com.example.instagram.dtos.posts.CreatePostRequest;
import gearfifth.com.example.instagram.dtos.posts.PostResponse;
import gearfifth.com.example.instagram.dtos.posts.UpdatePostRequest;
import gearfifth.com.example.instagram.models.posts.Post;
import gearfifth.com.example.instagram.models.posts.Reaction;
import gearfifth.com.example.instagram.models.shared.Image;
import gearfifth.com.example.instagram.services.posts.IPostService;
import gearfifth.com.example.instagram.services.shared.IImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collection;
import java.util.UUID;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/v1/posts")
public class PostController {
    private final IPostService service;

    @GetMapping
    public ResponseEntity<Collection<PostResponse>> getPosts() {
        return new ResponseEntity<>(service.getAll(), HttpStatus.OK);
    }

    @GetMapping("/{postId}")
    public ResponseEntity<PostResponse> get(@PathVariable UUID postId) {
        return new ResponseEntity<>(service.get(postId), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<PostResponse> create(@RequestBody CreatePostRequest request) {
        return new ResponseEntity<>(service.create(request), HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<PostResponse> update(@RequestBody UpdatePostRequest request) {
        return new ResponseEntity<>(service.update(request), HttpStatus.OK);
    }

    @DeleteMapping("/{postId}")
    public ResponseEntity<PostResponse> remove(@PathVariable UUID postId) {
        service.remove(postId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/{postId}/reactions")
    public ResponseEntity<PostResponse> addReaction(@PathVariable UUID postId, @RequestBody Reaction reaction) {
        service.addReaction(postId, reaction);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/{postId}/reactions")
    public ResponseEntity<PostResponse> removeReaction(@PathVariable UUID postId, @RequestBody Reaction reaction) {
        service.removeReaction(postId, reaction);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
