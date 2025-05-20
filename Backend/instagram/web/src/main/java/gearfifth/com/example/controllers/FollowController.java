package gearfifth.com.example.controllers;

import gearfifth.com.example.dtos.followers.FollowRequest;
import gearfifth.com.example.follow.IFollowService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/follow")
@RequiredArgsConstructor
public class FollowController {

    private final IFollowService followService;

    @PostMapping
    public ResponseEntity<Void> followUser(@RequestBody FollowRequest request) {
        followService.followUser(request);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping
    public ResponseEntity<Void> unfollowUser(@RequestBody FollowRequest request) {
        followService.unfollowUser(request);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}