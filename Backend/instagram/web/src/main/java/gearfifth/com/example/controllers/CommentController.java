package gearfifth.com.example.controllers;

import gearfifth.com.example.dtos.comments.CreateCommentRequest;
import gearfifth.com.example.dtos.comments.CommentResponse;
import gearfifth.com.example.dtos.comments.UpdateCommentRequest;
import gearfifth.com.example.posts.ICommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.UUID;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/v1/comments")
public class CommentController {
    private final ICommentService service;

    @GetMapping
    public ResponseEntity<Collection<CommentResponse>> getComments() {
        return new ResponseEntity<>(service.getAll(), HttpStatus.OK);
    }

    @GetMapping("/{commentId}")
    public ResponseEntity<CommentResponse> get(@PathVariable UUID commentId) {
        return new ResponseEntity<>(service.get(commentId), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<CommentResponse> create(@RequestBody CreateCommentRequest request) {
        return new ResponseEntity<>(service.create(request), HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<CommentResponse> update(@RequestBody UpdateCommentRequest request) {
        return new ResponseEntity<>(service.update(request), HttpStatus.OK);
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<CommentResponse> remove(@PathVariable UUID commentId) {
        service.remove(commentId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


    @GetMapping("/post/{postId}")
    public ResponseEntity<Collection<CommentResponse>> getCommentsByPostId(@PathVariable UUID postId) {
        return new ResponseEntity<>(service.getCommentsByPostId(postId), HttpStatus.OK);
    }

    @GetMapping("/parent/{parentCommentId}")
    public ResponseEntity<Collection<CommentResponse>> getCommentsByParentCommentId(@PathVariable UUID parentCommentId) {
        return new ResponseEntity<>(service.getCommentsByParentCommentId(parentCommentId), HttpStatus.OK);
    }
}
