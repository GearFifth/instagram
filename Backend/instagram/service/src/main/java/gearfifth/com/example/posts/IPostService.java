package gearfifth.com.example.posts;

import gearfifth.com.example.dtos.images.ImageDetailsResponse;
import gearfifth.com.example.dtos.posts.CreatePostRequest;
import gearfifth.com.example.dtos.posts.PostResponse;
import gearfifth.com.example.dtos.posts.UpdatePostRequest;
import gearfifth.com.example.models.posts.Post;
import java.util.Collection;
import java.util.UUID;

import gearfifth.com.example.models.posts.Reaction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

public interface IPostService {
    Collection<PostResponse> getAll();
    PostResponse get(UUID postId);
    PostResponse create(CreatePostRequest request);
    PostResponse update(UpdatePostRequest request);
    void remove(UUID postId);
    void addReaction(UUID postId, Reaction reaction);
    void removeReaction(UUID postId, Reaction reaction);
    Collection<PostResponse> getPostsForUserFeed(UUID userId, int pageNumber, int itemsPerPage);
    Collection<PostResponse> getPostsByUserId(UUID userId, int pageNumber, int itemsPerPage);
}