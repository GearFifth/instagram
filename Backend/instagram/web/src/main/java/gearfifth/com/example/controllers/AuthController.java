package gearfifth.com.example.controllers;

import gearfifth.com.example.dtos.auth.*;
import gearfifth.com.example.dtos.images.ImageDetailsResponse;
import gearfifth.com.example.dtos.users.responses.UserProfileResponse;
import gearfifth.com.example.auth.IAuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/v1/auth")
public class AuthController {
    private final IAuthService service;


//    @PostMapping("/register")
//    public ResponseEntity<UserProfileResponse> register(@Valid @RequestBody UserCreateRequest request) {
//        return new ResponseEntity<>(service.register(request), HttpStatus.CREATED);
//    }

    @PostMapping(value = "/register", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<UserProfileResponse> register(
            @Valid @RequestPart("user") UserCreateRequest request,
            @RequestPart(value = "profileImage", required = false) MultipartFile profileImage) {

        return new ResponseEntity<>(service.register(request, profileImage), HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<TokenResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(service.login(request));
    }

    @PutMapping("/change-password")
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
    public ResponseEntity<Void> verify(@RequestParam("token") String verificationToken){
        service.verifyEmail(verificationToken);
        return ResponseEntity.noContent().build();
    }

}