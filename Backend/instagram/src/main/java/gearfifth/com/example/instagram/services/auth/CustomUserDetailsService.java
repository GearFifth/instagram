package gearfifth.com.example.instagram.services.auth;

import gearfifth.com.example.instagram.exceptions.UserNotFoundException;
import gearfifth.com.example.instagram.models.users.User;
import gearfifth.com.example.instagram.models.users.UserPrincipal;
import gearfifth.com.example.instagram.repositories.IUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class CustomUserDetailsService implements UserDetailsService {
    private final IUserRepository userRepository;

    @Override
    public UserPrincipal loadUserByUsername(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException(email));

        return new UserPrincipal(user);
    }
}