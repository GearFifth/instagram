package gearfifth.com.example.instagram.services.posts;

import gearfifth.com.example.instagram.dtos.comments.CommentResponse;
import gearfifth.com.example.instagram.dtos.comments.CreateCommentRequest;
import gearfifth.com.example.instagram.dtos.comments.UpdateCommentRequest;
import gearfifth.com.example.instagram.models.posts.Comment;

import java.util.Collection;
import java.util.UUID;

public interface ICommentService {
    Collection<CommentResponse> getAll();
    CommentResponse get(UUID commentId) ;
    CommentResponse create(CreateCommentRequest request);
    CommentResponse update(UpdateCommentRequest comment);
    void remove(UUID commentId);
    Collection<CommentResponse> getCommentsByPostId(UUID postId);
    Collection<CommentResponse> getCommentsByParentCommentId(UUID parentCommentId);
}