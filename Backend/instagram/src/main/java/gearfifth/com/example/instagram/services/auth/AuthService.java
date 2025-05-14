package gearfifth.com.example.instagram.services.auth;

import gearfifth.com.example.instagram.dtos.auth.LoginRequest;
import gearfifth.com.example.instagram.dtos.auth.TokenResponse;
import gearfifth.com.example.instagram.exceptions.EmailAlreadyExistsException;
import gearfifth.com.example.instagram.exceptions.InvalidCredentialsException;
import gearfifth.com.example.instagram.exceptions.InvalidTokenException;
import gearfifth.com.example.instagram.models.User;
import gearfifth.com.example.instagram.models.UserPrincipal;
import gearfifth.com.example.instagram.repositories.IUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Primary;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
@Service
@Primary
public class AuthService implements IAuthService {

    private final IUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authManager;
    private final JwtService jwtUtils;
    private final CustomUserDetailsService customUserDetailsService;


    @Override
    public User register(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new EmailAlreadyExistsException(user.getEmail());
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    @Override
    public TokenResponse login(LoginRequest request) {
        try {
            Authentication authentication = authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );

            UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
            return generateTokens(userPrincipal);

        } catch (Exception e) {
            throw new InvalidCredentialsException("Invalid username or password");
        }
    }

    @Override
    public TokenResponse refresh(String refreshToken) {
        String username = jwtUtils.extractUserName(refreshToken);
        UserPrincipal userPrincipal = customUserDetailsService.loadUserByUsername(username);

        if (!jwtUtils.validateToken(refreshToken, userPrincipal)) {
            throw new InvalidTokenException("Invalid or expired refresh token");
        }

        return generateTokens(userPrincipal);
    }

    @Override
    public void logout() {
        SecurityContextHolder.clearContext();
    }

    private TokenResponse generateTokens(UserPrincipal userPrincipal) {
        TokenResponse tokenResponse = new TokenResponse();
        tokenResponse.setAccessToken(jwtUtils.generateAccessToken(userPrincipal));
        tokenResponse.setRefreshToken(jwtUtils.generateRefreshToken(userPrincipal));
        return tokenResponse;
    }
}