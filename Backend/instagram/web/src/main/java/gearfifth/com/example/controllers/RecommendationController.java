package gearfifth.com.example.controllers;

import gearfifth.com.example.dtos.users.responses.UserProfileResponse;
import gearfifth.com.example.recommendations.IRecommendationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;

@RequiredArgsConstructor
@RestController
@Validated
@RequestMapping("api/v1/recommendations")
public class RecommendationController {
    private final IRecommendationService service;

    @GetMapping("/users")
    public ResponseEntity<Collection<UserProfileResponse>> recommendUsers(
            @RequestParam(defaultValue = "0") int pageNumber,
            @RequestParam(defaultValue = "10") int itemsPerPage)
    {
        return ResponseEntity.ok(service.recommendUsers(pageNumber, itemsPerPage));
    }

}