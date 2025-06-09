package gearfifth.com.example.dtos.users.responses;

import gearfifth.com.example.dtos.images.ImageDetailsResponse;
import lombok.Data;

import java.util.UUID;

@Data
public class UserBasicResponse {
    private UUID id;
    private String firstName;
    private String lastName;
    private ImageDetailsResponse profileImage;
}