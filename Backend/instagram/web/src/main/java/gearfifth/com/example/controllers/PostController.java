package gearfifth.com.example.controllers;

import gearfifth.com.example.dtos.posts.CreatePostRequest;
import gearfifth.com.example.dtos.posts.PostResponse;
import gearfifth.com.example.dtos.posts.UpdatePostRequest;
import gearfifth.com.example.dtos.users.requests.UserUpdateRequest;
import gearfifth.com.example.dtos.users.responses.UserProfileResponse;
import gearfifth.com.example.models.posts.Reaction;
import gearfifth.com.example.posts.IPostService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
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


    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<PostResponse> create(
            @Valid @RequestPart("post") CreatePostRequest request,
            @RequestPart(value = "image", required = false) MultipartFile image) {

        return new ResponseEntity<>(service.create(request, image), HttpStatus.CREATED);
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
    public ResponseEntity<Collection<PostResponse>> getPostsForUserProfile(
            @PathVariable UUID userId,
            @RequestParam(defaultValue = "0") int pageNumber,
            @RequestParam(defaultValue = "10") int itemsPerPage) {

        return new ResponseEntity<>(service.getPostsByUserId(userId, pageNumber, itemsPerPage), HttpStatus.OK);
    }

    @GetMapping("feed/user/{userId}")
    public ResponseEntity<Collection<PostResponse>> getPostsForUserFeed(
            @PathVariable UUID userId,
            @RequestParam(defaultValue = "0") int pageNumber,
            @RequestParam(defaultValue = "10") int itemsPerPage) {

        return new ResponseEntity<>(service.getPostsForUserFeed(userId, pageNumber, itemsPerPage), HttpStatus.OK);
    }
}
