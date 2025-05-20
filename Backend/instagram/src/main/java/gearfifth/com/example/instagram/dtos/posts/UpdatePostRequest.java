package gearfifth.com.example.instagram.dtos.posts;

import gearfifth.com.example.instagram.models.users.User;
import lombok.Data;

import java.util.UUID;

@Data
public class UpdatePostRequest {
    private UUID id;
    private String description;
}
