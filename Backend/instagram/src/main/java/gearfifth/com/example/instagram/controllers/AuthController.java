package gearfifth.com.example.instagram.controllers;

import gearfifth.com.example.instagram.dtos.auth.LoginRequest;
import gearfifth.com.example.instagram.dtos.auth.RefreshTokenRequest;
import gearfifth.com.example.instagram.dtos.auth.TokenResponse;
import gearfifth.com.example.instagram.dtos.users.requests.UserCreateRequest;
import gearfifth.com.example.instagram.dtos.users.responses.UserProfileResponse;
import gearfifth.com.example.instagram.models.User;
import gearfifth.com.example.instagram.services.auth.IAuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/v1/auth")
public class AuthController {
    private final IAuthService service;
    private final ModelMapper mapper;

    @PostMapping("/register")
    public ResponseEntity<UserProfileResponse> register(@Valid @RequestBody UserCreateRequest request) {
        User registeredUser = service.register(mapper.map(request, User.class));
        return new ResponseEntity<>(mapper.map(registeredUser, UserProfileResponse.class), HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<TokenResponse> login(@RequestBody LoginRequest request) {
        TokenResponse tokens = service.login(request);
        return ResponseEntity.ok(tokens);
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout() {
        service.logout();
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/refresh")
    public ResponseEntity<TokenResponse> refresh(@RequestBody RefreshTokenRequest request) {
        TokenResponse tokens = service.refresh(request.getRefreshToken());
        return ResponseEntity.ok(tokens);
    }
}