package gearfifth.com.example.controllers;

import gearfifth.com.example.dtos.auth.UserCreateRequest;
import gearfifth.com.example.dtos.followers.FollowRequest;
import gearfifth.com.example.dtos.users.responses.UserProfileResponse;
import gearfifth.com.example.dtos.users.requests.UserUpdateRequest;
import gearfifth.com.example.users.IUserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collection;
import java.util.UUID;

@RequiredArgsConstructor
@RestController
@Validated
@RequestMapping("api/v1/users")
public class UserController {
    private final IUserService service;

    @GetMapping
    public ResponseEntity<Collection<UserProfileResponse>> getUsers() {
        return new ResponseEntity<>(service.getAll(), HttpStatus.OK);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<UserProfileResponse> get(@PathVariable UUID userId) {
        return new ResponseEntity<>(service.get(userId), HttpStatus.OK);
    }


    @PutMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<UserProfileResponse> update(
            @Valid @RequestPart("user") UserUpdateRequest request,
            @RequestPart(value = "profileImage", required = false) MultipartFile profileImage) {

        return new ResponseEntity<>(service.update(request, profileImage), HttpStatus.OK);
    }


    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> remove(@PathVariable UUID userId) {
        service.remove(userId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/check-email")
    public ResponseEntity<Boolean> checkEmailUniqueness(@RequestParam String email) {
        return ResponseEntity.ok(service.isEmailUnique(email));
    }

    @GetMapping("/search")
    public ResponseEntity<Collection<UserProfileResponse>> searchUsers(@RequestParam String query) {
        return ResponseEntity.ok(service.searchUsers(query));
    }

    @GetMapping("/{userId}/followed")
    public ResponseEntity<Collection<UserProfileResponse>> getFollowed(@PathVariable UUID userId) {
        return ResponseEntity.ok(service.getFollowed(userId));
    }
}