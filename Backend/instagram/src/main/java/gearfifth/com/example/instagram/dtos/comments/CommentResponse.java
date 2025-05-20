package gearfifth.com.example.instagram.dtos.comments;

import gearfifth.com.example.instagram.dtos.IdReference;
import gearfifth.com.example.instagram.dtos.users.responses.UserProfileResponse;
import gearfifth.com.example.instagram.models.posts.Comment;
import gearfifth.com.example.instagram.models.posts.Post;
import gearfifth.com.example.instagram.models.users.User;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Data
public class CommentResponse {
    private UUID id;
    private String content;
    private IdReference post;
    private IdReference parentCommentId;
    private List<IdReference> replies;
    private IdReference author;
    private Date creationDate;
}
