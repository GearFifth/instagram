package gearfifth.com.example.auth;

import gearfifth.com.example.dtos.auth.ChangePasswordRequest;
import gearfifth.com.example.dtos.auth.LoginRequest;
import gearfifth.com.example.dtos.auth.TokenResponse;
import gearfifth.com.example.dtos.auth.UserCreateRequest;
import gearfifth.com.example.dtos.users.responses.UserProfileResponse;
import gearfifth.com.example.exceptions.EmailAlreadyExistsException;
import gearfifth.com.example.exceptions.InvalidCredentialsException;
import gearfifth.com.example.exceptions.InvalidTokenException;
import gearfifth.com.example.exceptions.UserNotFoundException;
import gearfifth.com.example.models.shared.Image;
import gearfifth.com.example.models.users.User;
import gearfifth.com.example.models.users.UserPrincipal;
import gearfifth.com.example.repositories.users.IUserRepository;
import gearfifth.com.example.images.IImageService;
import gearfifth.com.example.utils.JwtService;
import gearfifth.com.example.utils.IEmailService;
import gearfifth.com.example.verification.IVerificationTokenService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Primary;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@RequiredArgsConstructor
@Service
@Primary
public class AuthService implements IAuthService {

    private final IUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authManager;
    private final JwtService jwtUtils;
    private final CustomUserDetailsService customUserDetailsService;
    private final ModelMapper mapper;
    private final IVerificationTokenService verificationTokenService;
    private final IEmailService emailService;
    private final IImageService imageService;

    @Override
    @Transactional
    public UserProfileResponse register(UserCreateRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new EmailAlreadyExistsException(request.getEmail());
        }

        Image image = imageService.getImageDetails(request.getProfileImageId());

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setAddress(request.getAddress());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setProfileImage(image);
        user = userRepository.save(user);

        String token = UUID.randomUUID().toString();
        verificationTokenService.createVerificationToken(user, token);
        emailService.sendActivationEmail(user, token);

        return mapper.map(user, UserProfileResponse.class);
    }


    @Override
    public TokenResponse login(LoginRequest request) {
        try {
            Authentication authentication = authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );
            UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

            if (!userPrincipal.isEnabled()) {
                throw new InvalidCredentialsException("User account is not enabled. Please verify your email.");
            }

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

    @Transactional
    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null && authentication.isAuthenticated()) {
            new SecurityContextLogoutHandler().logout(request, response, authentication);
        } else {
            throw new InvalidTokenException("User is not authenticated");
        }
    }

    @Override
    public void changePassword(ChangePasswordRequest request, HttpServletRequest httpRequest) {
        String token = jwtUtils.extractBearerToken(httpRequest);
        String email = jwtUtils.extractUserName(token);

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException(email));

        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            throw new InvalidCredentialsException("Current password is incorrect");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
    }

    @Override
    public void verifyEmail(String verificationToken) {
        verificationTokenService.activateToken(verificationToken);
    }

    private TokenResponse generateTokens(UserPrincipal userPrincipal) {
        TokenResponse tokenResponse = new TokenResponse();
        tokenResponse.setAccessToken(jwtUtils.generateAccessToken(userPrincipal));
        tokenResponse.setRefreshToken(jwtUtils.generateRefreshToken(userPrincipal));
        return tokenResponse;
    }

}