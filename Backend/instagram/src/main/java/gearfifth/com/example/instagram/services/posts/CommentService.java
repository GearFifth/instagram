package gearfifth.com.example.instagram.services.posts;

import gearfifth.com.example.instagram.dtos.comments.CommentResponse;
import gearfifth.com.example.instagram.dtos.comments.CreateCommentRequest;
import gearfifth.com.example.instagram.dtos.comments.UpdateCommentRequest;
import gearfifth.com.example.instagram.dtos.posts.PostResponse;
import gearfifth.com.example.instagram.exceptions.CommentNotFoundException;
import gearfifth.com.example.instagram.exceptions.InvalidArgumentsException;
import gearfifth.com.example.instagram.exceptions.PostNotFoundException;
import gearfifth.com.example.instagram.exceptions.UserNotFoundException;
import gearfifth.com.example.instagram.models.posts.Comment;
import gearfifth.com.example.instagram.models.posts.Post;
import gearfifth.com.example.instagram.models.users.User;
import gearfifth.com.example.instagram.repositories.IUserRepository;
import gearfifth.com.example.instagram.repositories.posts.ICommentRepository;
import gearfifth.com.example.instagram.repositories.posts.IPostRepository;
import gearfifth.com.example.instagram.services.IUserService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.hibernate.service.UnknownServiceException;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CommentService implements ICommentService {
    private final ModelMapper mapper;
    private final ICommentRepository commentRepository;
    private final IPostRepository postRepository;
    private final IUserRepository userRepository;

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

        User author = findUserOrThrow(request.getAuthorId());
        newComment.setAuthor(author);
        newComment.setCreationDate(new Date());
        newComment.setContent(request.getContent());

        Post post = findPostOrThrow(request.getPostId());
        newComment.setPost(post);

        if(request.getParentCommentId() != null){
            Comment parentComment = findCommentOrThrow(request.getParentCommentId());
            if(!parentComment.getPost().getId().equals(post.getId())){
                throw new InvalidArgumentsException("Parent comment's post and given post do not match");
            }
            newComment.setParentComment(parentComment);
            parentComment.addReply(newComment);
        } else {
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
        Post post = findPostOrThrow(postId);

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

    private Comment findCommentOrThrow(UUID commentId) {
        return commentRepository.findById(commentId)
                .orElseThrow(() -> new CommentNotFoundException(commentId));
    }

    private Post findPostOrThrow(UUID postId) {
        return postRepository.findById(postId)
                .orElseThrow(() -> new PostNotFoundException(postId));
    }

    private User findUserOrThrow(UUID userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userId));
    }
}
