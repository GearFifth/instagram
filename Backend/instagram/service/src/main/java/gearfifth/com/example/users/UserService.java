package gearfifth.com.example.users;

import gearfifth.com.example.dtos.followers.FollowRequest;
import gearfifth.com.example.dtos.users.requests.UserUpdateRequest;
import gearfifth.com.example.dtos.users.responses.UserProfileResponse;
import gearfifth.com.example.exceptions.EmailAlreadyExistsException;
import gearfifth.com.example.exceptions.UserNotFoundException;
import gearfifth.com.example.models.users.User;
import gearfifth.com.example.repositories.IUserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
@Primary
public class UserService implements IUserService {
    private final IUserRepository userRepository;
    private final ModelMapper mapper;

    @Override
    public Collection<UserProfileResponse> getAll() {
        return userRepository.findAll().stream()
                .map(user -> mapper.map(user, UserProfileResponse.class))
                .collect(Collectors.toList());
    }

    @Override
    public UserProfileResponse get(UUID userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userId));
        return mapper.map(user, UserProfileResponse.class);
    }

    @Transactional
    @Override
    public UserProfileResponse update(UUID userId, UserUpdateRequest request) {
        User existingUser = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userId));

        if (!existingUser.getEmail().equals(request.getEmail()) && userRepository.existsByEmail(request.getEmail())) {
            throw new EmailAlreadyExistsException(request.getEmail());
        }

        mapper.map(request, existingUser);
        User updatedUser = userRepository.save(existingUser);
        return mapper.map(updatedUser, UserProfileResponse.class);
    }

    @Transactional
    @Override
    public void remove(UUID userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userId));
        userRepository.delete(user);
    }

    @Override
    public boolean isEmailUnique(String email) {
        return !userRepository.existsByEmail(email);
    }

    @Override
    public User findUserOrThrow(UUID userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userId));
    }

    @Override
    public Collection<UserProfileResponse> searchUsers(String query) {
        List<User> matchedUsers = userRepository.searchByFirstNameLastNameOrEmail(query);
        return matchedUsers.stream()
                .map(user -> mapper.map(user, UserProfileResponse.class))
                .collect(Collectors.toList());
    }

}
