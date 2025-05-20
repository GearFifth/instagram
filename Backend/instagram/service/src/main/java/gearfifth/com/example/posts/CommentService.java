package gearfifth.com.example.posts;

import gearfifth.com.example.dtos.comments.CommentResponse;
import gearfifth.com.example.dtos.comments.CreateCommentRequest;
import gearfifth.com.example.dtos.comments.UpdateCommentRequest;
import gearfifth.com.example.exceptions.CommentNotFoundException;
import gearfifth.com.example.models.posts.Comment;
import gearfifth.com.example.models.posts.Post;
import gearfifth.com.example.models.users.User;
import gearfifth.com.example.repositories.IUserRepository;
import gearfifth.com.example.repositories.posts.ICommentRepository;
import gearfifth.com.example.repositories.posts.IPostRepository;
import gearfifth.com.example.users.IUserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.Date;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CommentService implements ICommentService {
    private final ModelMapper mapper;
    private final ICommentRepository commentRepository;
    private final IPostService postService;
    private final IUserService userService;

    @Override
    public Collection<CommentResponse> getAll() {
        return commentRepository.findAll().stream()
                .map(comment -> mapper.map(comment, CommentResponse.class))
                .collect(Collectors.toList());
    }

    @Override
    public CommentResponse get(UUID commentId) {
        Comment comment = findCommentOrThrow(commentId);
        return mapper.map(comment, CommentResponse.class);
    }

    @Transactional
    @Override
    public CommentResponse create(CreateCommentRequest request) {
        Comment newComment = new Comment();

        User author = userService.findUserOrThrow(request.getAuthorId());
        newComment.setAuthor(author);
        newComment.setCreationDate(new Date());
        newComment.setContent(request.getContent());

        if(request.getParentCommentId() != null){
            Comment parentComment = findCommentOrThrow(request.getParentCommentId());
            newComment.setParentComment(parentComment);
            parentComment.addReply(newComment);
        } else {
            Post post = postService.findPostOrThrow(request.getPostId());
            newComment.setPost(post);
            post.addComment(newComment);
        }

        return mapper.map(commentRepository.save(newComment), CommentResponse.class);
    }

    @Override
    public CommentResponse update(UpdateCommentRequest request) {
        Comment comment = findCommentOrThrow(request.getCommentId());
        comment.setContent(request.getContent());
        return mapper.map(commentRepository.save(comment), CommentResponse.class);
    }

    @Override
    public void remove(UUID commentId) {
        Comment comment = findCommentOrThrow(commentId);
        commentRepository.delete(comment);
    }

    @Override
    public Collection<CommentResponse> getCommentsByPostId(UUID postId) {
        Post post = postService.findPostOrThrow(postId);

        return post.getComments().stream()
                .map(comment -> mapper.map(comment, CommentResponse.class))
                .collect(Collectors.toList());
    }

    @Override
    public Collection<CommentResponse> getCommentsByParentCommentId(UUID parentCommentId) {
        Comment parentComment = findCommentOrThrow(parentCommentId);

        return parentComment.getReplies().stream()
                .map(comment -> mapper.map(comment, CommentResponse.class))
                .collect(Collectors.toList());
    }

    @Override
    public Comment findCommentOrThrow(UUID commentId) {
        return commentRepository.findById(commentId)
                .orElseThrow(() -> new CommentNotFoundException(commentId));
    }
}
