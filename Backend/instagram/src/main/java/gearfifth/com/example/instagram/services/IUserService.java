package gearfifth.com.example.instagram.services;

import gearfifth.com.example.instagram.dtos.users.requests.UserUpdateRequest;
import gearfifth.com.example.instagram.dtos.users.responses.UserProfileResponse;

import java.util.Collection;
import java.util.UUID;

public interface IUserService {
    Collection<UserProfileResponse> getAll();
    UserProfileResponse get(UUID userId);
    UserProfileResponse update(UUID userId, UserUpdateRequest user);
    void remove(UUID userId);
    boolean isEmailUnique(String email);
}