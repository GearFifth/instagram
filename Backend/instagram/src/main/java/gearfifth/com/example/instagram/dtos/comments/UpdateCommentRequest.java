package gearfifth.com.example.instagram.dtos.comments;

import lombok.Data;

import java.util.UUID;

@Data
public class UpdateCommentRequest {
    private UUID commentId;
    private String content;
}