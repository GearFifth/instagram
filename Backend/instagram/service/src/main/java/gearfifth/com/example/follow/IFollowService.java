package gearfifth.com.example.follow;

import gearfifth.com.example.dtos.followers.FollowRequest;
import gearfifth.com.example.models.users.User;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.UUID;

public interface IFollowService {
    void followUser(FollowRequest request);
    void unfollowUser(FollowRequest request);
    Collection<User> findUsersFollowedBy(UUID userId);
}
