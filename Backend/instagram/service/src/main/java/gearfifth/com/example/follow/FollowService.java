package gearfifth.com.example.follow;

import gearfifth.com.example.dtos.followers.FollowRequest;
import gearfifth.com.example.exceptions.InvalidArgumentsException;
import gearfifth.com.example.models.users.Follow;
import gearfifth.com.example.models.users.User;
import gearfifth.com.example.repositories.users.IFollowRepository;
import gearfifth.com.example.users.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class FollowService implements IFollowService {
    private final IUserService userService;
    private final IFollowRepository followRepository;

    @Transactional
    @Override
    public void followUser(FollowRequest request) {
        User fromUser = userService.findUserOrThrow(request.getFromUserId());
        User toUser = userService.findUserOrThrow(request.getToUserId());

        if (fromUser.getId().equals(toUser.getId())) {
            throw new InvalidArgumentsException("User cannot follow themselves.");
        }

        if (followRepository.existsByFromAndTo(fromUser, toUser)) {
            throw new InvalidArgumentsException("User is already following this user.");
        }

        if (!toUser.isEnabled()) {
            throw new InvalidArgumentsException("Cannot follow an inactive user.");
        }

        followRepository.save(new Follow(fromUser, toUser));
    }

    @Transactional
    @Override
    public void unfollowUser(FollowRequest request) {
        User fromUser = userService.findUserOrThrow(request.getFromUserId());
        User toUser = userService.findUserOrThrow(request.getToUserId());

        Follow follow = followRepository.findByFromAndTo(fromUser, toUser)
                .orElseThrow(() -> new InvalidArgumentsException("Follow relationship does not exist."));

        followRepository.delete(follow);
    }

    @Override
    public Collection<User> findUsersFollowedBy(UUID userId){
        return followRepository.findUsersFollowedBy(userId);
    }

    @Override
    public boolean isFollowing(FollowRequest request) {
        return followRepository.existsByFromIdAndToId(request.getFromUserId(), request.getToUserId());
    }
}
