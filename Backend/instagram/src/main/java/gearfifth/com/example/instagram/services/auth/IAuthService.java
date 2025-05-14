package gearfifth.com.example.instagram.services.auth;

import gearfifth.com.example.instagram.dtos.auth.LoginRequest;
import gearfifth.com.example.instagram.dtos.auth.TokenResponse;
import gearfifth.com.example.instagram.models.User;

import java.util.Map;

public interface IAuthService {
    User register(User user);
    TokenResponse login(LoginRequest request);
    TokenResponse refresh(String refreshToken);
    void logout();
}