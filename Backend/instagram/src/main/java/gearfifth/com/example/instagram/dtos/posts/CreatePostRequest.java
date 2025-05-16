package gearfifth.com.example.instagram.dtos.posts;

import gearfifth.com.example.instagram.models.posts.Comment;
import gearfifth.com.example.instagram.models.posts.ReactionType;
import gearfifth.com.example.instagram.models.shared.Image;
import gearfifth.com.example.instagram.models.users.User;
import lombok.Data;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Data
public class CreatePostRequest {
    private String description;
    private UUID authorId;
}
