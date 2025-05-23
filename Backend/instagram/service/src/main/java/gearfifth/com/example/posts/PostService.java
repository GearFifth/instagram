package gearfifth.com.example.posts;

import gearfifth.com.example.dtos.posts.CreatePostRequest;
import gearfifth.com.example.dtos.posts.PostResponse;
import gearfifth.com.example.dtos.posts.UpdatePostRequest;
import gearfifth.com.example.exceptions.PostNotFoundException;
import gearfifth.com.example.follow.IFollowService;
import gearfifth.com.example.models.posts.Comment;
import gearfifth.com.example.models.posts.Post;
import gearfifth.com.example.models.posts.Reaction;
import gearfifth.com.example.models.shared.Image;
import gearfifth.com.example.models.users.User;
import gearfifth.com.example.repositories.posts.IPostRepository;
import gearfifth.com.example.images.IImageService;
import gearfifth.com.example.users.IUserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PostService implements IPostService{
    private final IPostRepository postRepository;
    private final IUserService userService;
    private final IImageService imageService;
    private final ModelMapper mapper;
    private final IFollowService followService;

    @Override
    public Collection<PostResponse> getAll() {
        return postRepository.findAll().stream()
                .map(post -> mapper.map(post, PostResponse.class))
                .collect(Collectors.toList());
    }

    @Override
    public PostResponse get(UUID postId) {
        Post post = findPostOrThrow(postId);
        return mapper.map(post, PostResponse.class);
    }

    @Override
        public PostResponse create(CreatePostRequest request) {
        User author = userService.findUserOrThrow(request.getAuthorId());
        Image image = imageService.getImageDetails(request.getImageId());

        Post newPost = new Post();
        newPost.setDescription(request.getDescription());
        newPost.setAuthor(author);
        newPost.setCreationDate(new Date());
        newPost.setImage(image);

        return mapper.map(postRepository.save(newPost), PostResponse.class);
    }

    @Override
    public PostResponse update(UpdatePostRequest request) {
        Post post = findPostOrThrow(request.getId());
        post.setDescription(request.getDescription());
        return mapper.map(postRepository.save(post), PostResponse.class);
    }

    @Transactional
    public void remove(UUID postId) {
        Post post = findPostOrThrow(postId);

        post.setDeleted(true);
        post.setDeletedAt(new Date());

        postRepository.save(post);
    }

    @Override
    public void addReaction(UUID postId, Reaction reaction) {
        Post post = findPostOrThrow(postId);
        post.addReaction(reaction);
        postRepository.save(post);
    }

    @Override
    public void removeReaction(UUID postId, Reaction reaction) {
        Post post = findPostOrThrow(postId);
        post.removeReaction(reaction);
        postRepository.save(post);
    }

    @Override
    public Collection<PostResponse> getPostsForUserFeed(UUID userId, int pageNumber, int itemsPerPage) {
        Pageable pageable = PageRequest.of(pageNumber, itemsPerPage, Sort.by(Sort.Direction.DESC, "creationDate"));
        User user = userService.findUserOrThrow(userId);
        Collection<User> followedUsers = followService.findUsersFollowedBy(userId);

        followedUsers.add(user);

        return postRepository.findByAuthorIn(followedUsers, pageable)
                .stream()
                .map(post -> mapper.map(post, PostResponse.class))
                .collect(Collectors.toList());
    }

    @Override
    public Collection<PostResponse> getPostsByUserId(UUID userId, int pageNumber, int itemsPerPage) {
        Pageable pageable = PageRequest.of(pageNumber, itemsPerPage, Sort.by(Sort.Direction.DESC, "creationDate"));

        return postRepository.findAllByAuthorId(userId, pageable)
                .stream()
                .map(post -> mapper.map(post, PostResponse.class))
                .collect(Collectors.toList());
    }


    @Override
    public Post findPostOrThrow(UUID postId) {
        return postRepository.findById(postId)
                .orElseThrow(() -> new PostNotFoundException(postId));
    }

}
