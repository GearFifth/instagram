package gearfifth.com.example.recommendations;

import gearfifth.com.example.dtos.users.responses.UserProfileResponse;

import java.util.Collection;

public interface IRecommendationService {
    Collection<UserProfileResponse> recommendUsers(int pageNumber, int pageSize);
}
