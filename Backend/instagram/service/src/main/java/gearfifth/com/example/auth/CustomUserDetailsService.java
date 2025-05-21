package gearfifth.com.example.auth;

import gearfifth.com.example.exceptions.UserNotFoundException;
import gearfifth.com.example.models.users.User;
import gearfifth.com.example.models.users.UserPrincipal;
import gearfifth.com.example.repositories.users.IUserRepository;
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