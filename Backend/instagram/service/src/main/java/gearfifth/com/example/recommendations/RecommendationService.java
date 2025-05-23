package gearfifth.com.example.recommendations;

import gearfifth.com.example.dtos.users.responses.UserProfileResponse;
import gearfifth.com.example.exceptions.InvalidArgumentsException;
import gearfifth.com.example.models.users.Follow;
import gearfifth.com.example.models.users.User;
import gearfifth.com.example.models.users.UserPrincipal;
import gearfifth.com.example.users.IUserService;
import gearfifth.com.example.utils.UserUtils;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.hibernate.Hibernate;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RecommendationService implements IRecommendationService {

    private final ModelMapper mapper;
    private final IUserService userService;

    @Transactional
    @Override
    public Collection<UserProfileResponse> recommendUsers(int pageNumber, int pageSize) {
        UUID loggedUserId = UserUtils.getLoggedUserOrThrow().getId();
        User loggedUser = userService.findUserOrThrow(loggedUserId);

        Set<UUID> followingIds = getFollowingIds(loggedUser);

        List<User> recommendations = collectRecommendations(loggedUser, followingIds).stream().toList();

        List<User> paginated = paginateList(recommendations, pageNumber, pageSize);

        return paginated.stream()
                .map(user -> mapper.map(user, UserProfileResponse.class))
                .collect(Collectors.toList());
    }


    private Set<UUID> getFollowingIds(User user) {
        return user.getFollowing().stream()
                .map(f -> f.getTo().getId())
                .collect(Collectors.toSet());
    }

    private Set<User> collectRecommendations(User loggedUser, Set<UUID> followingIds) {
        Set<User> recommendations = new HashSet<>();

        for (Follow follow : loggedUser.getFollowing()) {
            User followed = follow.getTo();
            if (followed == null || followed.isDeleted()) continue;

            for (Follow innerFollow : followed.getFollowing()) {
                User potential = innerFollow.getTo();
                if (potential == null || potential.isDeleted()) continue;

                UUID potentialId = potential.getId();
                if (!followingIds.contains(potentialId) && !potentialId.equals(loggedUser.getId())) {
                    recommendations.add(potential);
                }
            }
        }

        return recommendations;
    }

    private <T> List<T> paginateList(List<T> fullList, int pageNumber, int pageSize) {
        int start = pageNumber * pageSize;
        if (start >= fullList.size()) return List.of();

        int end = Math.min(start + pageSize, fullList.size());
        return fullList.subList(start, end);
    }

}
