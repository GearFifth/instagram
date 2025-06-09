package gearfifth.com.example.users;

import gearfifth.com.example.dtos.users.requests.UserUpdateRequest;
import gearfifth.com.example.dtos.users.responses.UserProfileResponse;
import gearfifth.com.example.models.users.User;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collection;
import java.util.UUID;

public interface IUserService {
    Collection<UserProfileResponse> getAll();
    UserProfileResponse get(UUID userId);
    UserProfileResponse update(UserUpdateRequest user,  MultipartFile profileImage);
    void remove(UUID userId);
    boolean isEmailUnique(String email);

    User findUserOrThrow(UUID userId);
    Collection<UserProfileResponse> searchUsers(String query);

    Collection<UserProfileResponse> getFollowed(UUID userId);
}