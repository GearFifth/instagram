package gearfifth.com.example.instagram.dtos.comments;

import gearfifth.com.example.instagram.dtos.IdReference;
import gearfifth.com.example.instagram.dtos.users.responses.UserProfileResponse;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Data
public class CreateCommentRequest {
    @NotNull(message = "Content cannot be null.")
    private String content;

    @NotNull(message = "Post ID cannot be null.")
    private UUID postId;
    private UUID parentCommentId;

    @NotNull(message = "Author ID cannot be null.")
    private UUID authorId;
}
