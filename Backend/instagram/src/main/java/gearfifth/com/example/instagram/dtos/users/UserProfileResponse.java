package gearfifth.com.example.instagram.dtos.users;

import gearfifth.com.example.instagram.models.UserRole;
import lombok.Data;

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
}