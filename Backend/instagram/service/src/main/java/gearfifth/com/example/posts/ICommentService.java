package gearfifth.com.example.posts;

import gearfifth.com.example.dtos.comments.CommentResponse;
import gearfifth.com.example.dtos.comments.CreateCommentRequest;
import gearfifth.com.example.dtos.comments.UpdateCommentRequest;
import gearfifth.com.example.models.posts.Comment;

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

    Comment findCommentOrThrow(UUID commentId);
}