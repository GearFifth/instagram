package gearfifth.com.example.auth;

import gearfifth.com.example.dtos.auth.ChangePasswordRequest;
import gearfifth.com.example.dtos.auth.LoginRequest;
import gearfifth.com.example.dtos.auth.TokenResponse;
import gearfifth.com.example.dtos.auth.UserCreateRequest;
import gearfifth.com.example.dtos.users.responses.UserProfileResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.multipart.MultipartFile;

public interface IAuthService {
    UserProfileResponse register(UserCreateRequest request, MultipartFile profileImage);
    TokenResponse login(LoginRequest request);
    TokenResponse refresh(String refreshToken);
    void logout(HttpServletRequest request, HttpServletResponse response);
    void changePassword(ChangePasswordRequest request, HttpServletRequest httpRequest);
    void verifyEmail(String verificationToken);
}