package gearfifth.com.example.dtos.posts;

import gearfifth.com.example.dtos.IdReference;
import gearfifth.com.example.dtos.comments.CommentResponse;
import gearfifth.com.example.dtos.images.ImageDetailsResponse;
import gearfifth.com.example.dtos.users.responses.UserProfileResponse;

import gearfifth.com.example.enums.ReactionType;
import jakarta.persistence.*;
import lombok.Data;

import java.util.*;

@Data
public class PostResponse {
    private UUID id;

    private String description;

    private Date creationDate;

    private List<IdReference> comments;

    private ImageDetailsResponse image;

    private Map<UUID, ReactionType> reactions;

    private UserProfileResponse author;
}
