package gearfifth.com.example.instagram.controllers;

import gearfifth.com.example.instagram.dtos.users.UserCreateRequest;
import gearfifth.com.example.instagram.dtos.users.UserProfileResponse;
import gearfifth.com.example.instagram.dtos.users.UserUpdateRequest;
import gearfifth.com.example.instagram.models.User;
import gearfifth.com.example.instagram.services.IUserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.UUID;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RestController
@Validated
@RequestMapping("api/v1/users")
public class UserController {
    private final IUserService service;
    private final ModelMapper mapper;

    @PostMapping
    public ResponseEntity<UserProfileResponse> create(@Valid @RequestBody UserCreateRequest user) {
        return new ResponseEntity<>(mapper.map(service.create(mapper.map(user, User.class)), UserProfileResponse.class), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<Collection<UserProfileResponse>> getUsers() {
        Collection<User> users = service.getAll();
        Collection<UserProfileResponse> userResponses =  users.stream()
                .map(user -> mapper.map(user, UserProfileResponse.class))
                .collect(Collectors.toList());
        return new ResponseEntity<>(userResponses, HttpStatus.OK);
    }

    @GetMapping({"/{userId}"})
    public ResponseEntity<UserProfileResponse> get(@PathVariable UUID userId) {
        User user = service.get(userId);
        return new ResponseEntity<>( mapper.map(user, UserProfileResponse.class), HttpStatus.OK);
    }

    @PutMapping({"/{userId}"})
    public ResponseEntity<UserProfileResponse> update(@PathVariable UUID userId, @Valid @RequestBody UserUpdateRequest user) {
        User updatedUser = service.update(mapper.map(user, User.class));
        return new ResponseEntity<>(mapper.map(updatedUser, UserProfileResponse.class), HttpStatus.OK);
    }

    @DeleteMapping({"/{userId}"})
    public ResponseEntity<Void> remove(@PathVariable UUID userId) {
        service.remove(userId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}