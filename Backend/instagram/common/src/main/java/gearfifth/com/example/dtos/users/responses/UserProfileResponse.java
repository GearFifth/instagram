package gearfifth.com.example.dtos.users.responses;

import gearfifth.com.example.dtos.IdReference;
import gearfifth.com.example.dtos.images.ImageDetailsResponse;
import gearfifth.com.example.enums.UserRole;
import jakarta.persistence.OneToMany;
import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
public class UserProfileResponse {
    private UUID id;
    private String email;
    private String firstName;
    private String lastName;
    private String address;
    private String phoneNumber;
    private UserRole role = UserRole.USER;
    private ImageDetailsResponse profileImage;
    private List<IdReference> followers;
    private List<IdReference> following;
}