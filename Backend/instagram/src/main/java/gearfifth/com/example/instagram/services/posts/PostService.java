package gearfifth.com.example.instagram.services.posts;

import gearfifth.com.example.instagram.dtos.images.ImageDetailsResponse;
import gearfifth.com.example.instagram.dtos.posts.CreatePostRequest;
import gearfifth.com.example.instagram.dtos.posts.PostResponse;
import gearfifth.com.example.instagram.dtos.posts.UpdatePostRequest;
import gearfifth.com.example.instagram.dtos.users.responses.UserProfileResponse;
import gearfifth.com.example.instagram.exceptions.PostNotFoundException;
import gearfifth.com.example.instagram.exceptions.UserNotFoundException;
import gearfifth.com.example.instagram.models.posts.Post;
import gearfifth.com.example.instagram.models.posts.Reaction;
import gearfifth.com.example.instagram.models.shared.Image;
import gearfifth.com.example.instagram.models.users.User;
import gearfifth.com.example.instagram.repositories.IUserRepository;
import gearfifth.com.example.instagram.repositories.posts.IPostRepository;
import gearfifth.com.example.instagram.services.shared.IImageService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PostService implements IPostService{
    private final IPostRepository postRepository;
    private final IUserRepository userRepository;
    private final IImageService imageService;
    private final ModelMapper mapper;

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
        User author = getUserById(request.getAuthorId());
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

    @Override
    public void remove(UUID postId) {
        Post post = findPostOrThrow(postId);
        postRepository.delete(post);
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
    public Collection<PostResponse> getPostsForUser(UUID userId, int pageNumber, int itemsPerPage) {
        Pageable pageable = PageRequest.of(pageNumber, itemsPerPage, Sort.by(Sort.Direction.DESC, "creationDate"));

//        postRepository.findAllForUser(userId, pageable) //Add after implementing followers logic

        return postRepository.findAll( pageable)
                .stream()
                .map(post -> mapper.map(post, PostResponse.class))
                .collect(Collectors.toList());
    }


    private Post findPostOrThrow(UUID postId) {
        return postRepository.findById(postId)
                .orElseThrow(() -> new PostNotFoundException(postId));
    }

    private User getUserById(UUID userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userId));
    }


//    @Override
//    public Page<Post> getUserPosts(Long userId, Pageable pageable) {
//        return null;
//    }
}
