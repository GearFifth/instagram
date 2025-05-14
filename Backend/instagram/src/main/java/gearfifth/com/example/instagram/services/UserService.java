package gearfifth.com.example.instagram.services;

import gearfifth.com.example.instagram.exceptions.EmailAlreadyExistsException;
import gearfifth.com.example.instagram.exceptions.UserNotFoundException;
import gearfifth.com.example.instagram.models.User;
import gearfifth.com.example.instagram.repositories.IUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Collection;
import java.util.UUID;

@RequiredArgsConstructor
@Service
@Primary
public class UserService implements IUserService {
    private final IUserRepository userRepository;

    @Override
    public Collection<User> getAll() {
        return userRepository.findAll();
    }

    @Override
    public User get(UUID userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userId));
    }

    @Override
    public User update(User user) {
        User oldUser = userRepository.findById(user.getId())
                .orElseThrow(() -> new UserNotFoundException(user.getId()));

        if (!oldUser.getEmail().equals(user.getEmail()) && userRepository.existsByEmail(user.getEmail())) {
            throw new EmailAlreadyExistsException(user.getEmail());
        }
        return userRepository.save(user);
    }

    @Override
    public User remove(UUID userId) {
        User user = get(userId);
        userRepository.delete(user);
        return user;
    }


    @Override
    public User getByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException(email));
    }
}
