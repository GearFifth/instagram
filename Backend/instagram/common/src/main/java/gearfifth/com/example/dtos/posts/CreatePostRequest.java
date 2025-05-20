package gearfifth.com.example.dtos.posts;

import lombok.Data;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Data
public class CreatePostRequest {
    private String description;
    private UUID authorId;
    private UUID imageId;
}
