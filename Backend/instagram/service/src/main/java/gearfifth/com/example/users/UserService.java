package gearfifth.com.example.users;

import gearfifth.com.example.dtos.users.requests.UserUpdateRequest;
import gearfifth.com.example.dtos.users.responses.UserProfileResponse;
import gearfifth.com.example.exceptions.UserNotFoundException;
import gearfifth.com.example.images.IImageService;
import gearfifth.com.example.models.shared.Image;
import gearfifth.com.example.models.users.User;
import gearfifth.com.example.repositories.users.IUserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Service
@Primary
public class UserService implements IUserService {
    private final IUserRepository userRepository;
    private final IImageService imageService;
    private final ModelMapper mapper;

    @Override
    public Collection<UserProfileResponse> getAll() {
        return userRepository.findAll().stream()
                .map(user -> mapper.map(user, UserProfileResponse.class))
                .collect(Collectors.toList());
    }

    @Override
    public UserProfileResponse get(UUID userId) {
        User user = findUserOrThrow(userId);
        return mapper.map(user, UserProfileResponse.class);
    }

    @Transactional
    @Override
    public UserProfileResponse update(UserUpdateRequest request, MultipartFile profileImage) {
        User existingUser = findUserOrThrow(request.getId());

        existingUser.setFirstName(request.getFirstName());
        existingUser.setLastName(request.getLastName());
        existingUser.setAddress(request.getAddress());
        existingUser.setPhoneNumber(request.getPhoneNumber());

        if(profileImage != null && !profileImage.isEmpty()) {
            if (existingUser.getProfileImage() != null) {
                imageService.removeImage(existingUser.getProfileImage().getId());
            }
            Image image = imageService.uploadImage(profileImage, "users");
            existingUser.setProfileImage(image);
        }

        User updatedUser = userRepository.save(existingUser);
        return mapper.map(updatedUser, UserProfileResponse.class);
    }

    @Transactional
    @Override
    public void remove(UUID userId) {
        User user = findUserOrThrow(userId);

        user.setDeleted(true);
        user.setDeletedAt(new Date());

        userRepository.save(user);
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

    @Override
    public Collection<UserProfileResponse> getFollowed(UUID userId) {
        User user = findUserOrThrow(userId);
        return user.getFollowing().stream()
                .map(following -> mapper.map(following.getTo(), UserProfileResponse.class))
                .collect(Collectors.toList());
    }

}
