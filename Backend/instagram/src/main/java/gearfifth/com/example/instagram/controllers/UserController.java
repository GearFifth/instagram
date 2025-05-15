package gearfifth.com.example.instagram.controllers;

import gearfifth.com.example.instagram.dtos.users.responses.UserProfileResponse;
import gearfifth.com.example.instagram.dtos.users.requests.UserUpdateRequest;
import gearfifth.com.example.instagram.services.IUserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

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

    @PutMapping("/{userId}")
    public ResponseEntity<UserProfileResponse> update(@PathVariable UUID userId, @Valid @RequestBody UserUpdateRequest user) {
        return new ResponseEntity<>(service.update(userId, user), HttpStatus.OK);
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
}