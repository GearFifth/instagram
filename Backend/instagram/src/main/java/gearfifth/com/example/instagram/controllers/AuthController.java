package gearfifth.com.example.instagram.controllers;

import gearfifth.com.example.instagram.dtos.auth.*;
import gearfifth.com.example.instagram.dtos.users.responses.UserProfileResponse;
import gearfifth.com.example.instagram.services.auth.IAuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/v1/auth")
public class AuthController {
    private final IAuthService service;


    @PostMapping("/register")
    public ResponseEntity<UserProfileResponse> register(@Valid @RequestBody UserCreateRequest request) {
        return new ResponseEntity<>(service.register(request), HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<TokenResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(service.login(request));
    }

    @PostMapping("/change-password")
    public ResponseEntity<Void> changePassword(@Valid @RequestBody ChangePasswordRequest request, HttpServletRequest httpRequest) {
        service.changePassword(request, httpRequest);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletRequest request, HttpServletResponse response) {
        service.logout(request, response);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/refresh")
    public ResponseEntity<TokenResponse> refresh(@RequestBody RefreshTokenRequest request) {
        return ResponseEntity.ok(service.refresh(request.getRefreshToken()));
    }

    @GetMapping({"/verify-email"})
    public ResponseEntity<UserProfileResponse> verify(@RequestParam("token") String verificationToken){
        return new ResponseEntity<>(service.verifyEmail(verificationToken), HttpStatus.OK);
    }


}