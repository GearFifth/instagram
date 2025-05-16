package gearfifth.com.example.instagram.dtos.posts;

import gearfifth.com.example.instagram.dtos.comments.CommentResponse;
import gearfifth.com.example.instagram.dtos.images.ImageDetailsResponse;
import gearfifth.com.example.instagram.dtos.users.responses.UserProfileResponse;
import gearfifth.com.example.instagram.models.posts.Comment;
import gearfifth.com.example.instagram.models.posts.ReactionType;
import gearfifth.com.example.instagram.models.shared.Image;
import gearfifth.com.example.instagram.models.users.User;
import jakarta.persistence.*;
import lombok.Data;

import java.util.*;

@Data
public class PostResponse {
    private UUID id;

    private String description;

    private Date creationDate;

    private List<CommentResponse> comments;

    private ImageDetailsResponse image;

    private Map<UUID, ReactionType> reactions;

    private UserProfileResponse author;
}
