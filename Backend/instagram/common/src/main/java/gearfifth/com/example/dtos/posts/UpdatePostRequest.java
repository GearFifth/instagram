package gearfifth.com.example.dtos.posts;

import lombok.Data;

import java.util.UUID;

@Data
public class UpdatePostRequest {
    private UUID id;
    private String description;
}
