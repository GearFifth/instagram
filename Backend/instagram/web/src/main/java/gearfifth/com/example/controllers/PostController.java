package gearfifth.com.example.controllers;

import gearfifth.com.example.dtos.images.ImageDetailsResponse;
import gearfifth.com.example.dtos.posts.CreatePostRequest;
import gearfifth.com.example.dtos.posts.PostResponse;
import gearfifth.com.example.dtos.posts.UpdatePostRequest;
import gearfifth.com.example.models.posts.Post;
import gearfifth.com.example.models.posts.Reaction;
import gearfifth.com.example.models.shared.Image;
import gearfifth.com.example.posts.IPostService;
import gearfifth.com.example.shared.IImageService;
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
    public ResponseEntity<Void> addReaction(@PathVariable UUID postId, @RequestBody Reaction reaction) {
        service.addReaction(postId, reaction);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/{postId}/reactions")
    public ResponseEntity<Void> removeReaction(@PathVariable UUID postId, @RequestBody Reaction reaction) {
        service.removeReaction(postId, reaction);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<Collection<PostResponse>> getPostsForUser(
            @PathVariable UUID userId,
            @RequestParam(defaultValue = "0") int pageNumber,
            @RequestParam(defaultValue = "10") int itemsPerPage) {

        return new ResponseEntity<>(service.getPostsForUser(userId, pageNumber, itemsPerPage), HttpStatus.OK);
    }
}
