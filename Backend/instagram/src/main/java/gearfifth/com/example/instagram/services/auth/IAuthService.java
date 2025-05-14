package gearfifth.com.example.instagram.services.auth;

import gearfifth.com.example.instagram.dtos.auth.ChangePasswordRequest;
import gearfifth.com.example.instagram.dtos.auth.LoginRequest;
import gearfifth.com.example.instagram.dtos.auth.TokenResponse;
import gearfifth.com.example.instagram.models.User;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.util.Map;

public interface IAuthService {
    User register(User user);
    TokenResponse login(LoginRequest request);
    TokenResponse refresh(String refreshToken);
    void logout(HttpServletRequest request, HttpServletResponse response);
    void changePassword(ChangePasswordRequest request, HttpServletRequest httpRequest);
}