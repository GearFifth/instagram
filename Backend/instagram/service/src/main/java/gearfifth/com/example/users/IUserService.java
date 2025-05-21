package gearfifth.com.example.users;

import gearfifth.com.example.dtos.users.requests.UserUpdateRequest;
import gearfifth.com.example.dtos.users.responses.UserProfileResponse;
import gearfifth.com.example.models.users.User;

import java.util.Collection;
import java.util.UUID;

public interface IUserService {
    Collection<UserProfileResponse> getAll();
    UserProfileResponse get(UUID userId);
    UserProfileResponse update(UUID userId, UserUpdateRequest user);
    void remove(UUID userId);
    boolean isEmailUnique(String email);

    User findUserOrThrow(UUID userId);
    Collection<UserProfileResponse> searchUsers(String query);
}