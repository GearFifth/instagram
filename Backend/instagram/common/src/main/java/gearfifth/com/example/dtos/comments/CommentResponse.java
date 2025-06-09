package gearfifth.com.example.dtos.comments;

import gearfifth.com.example.dtos.IdReference;
import gearfifth.com.example.dtos.users.responses.UserProfileResponse;
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
    private UserProfileResponse author;
    private Date creationDate;
}
