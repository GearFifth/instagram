package gearfifth.com.example.instagram.services.posts;

import gearfifth.com.example.instagram.dtos.images.ImageDetailsResponse;
import gearfifth.com.example.instagram.dtos.posts.CreatePostRequest;
import gearfifth.com.example.instagram.dtos.posts.PostResponse;
import gearfifth.com.example.instagram.dtos.posts.UpdatePostRequest;
import gearfifth.com.example.instagram.models.posts.Post;
import java.util.Collection;
import java.util.UUID;

import gearfifth.com.example.instagram.models.posts.Reaction;
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
    Collection<PostResponse> getPostsForUser(UUID userId, int pageNumber, int itemsPerPage);
}