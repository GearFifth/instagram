package gearfifth.com.example.instagram.services.verification;

import gearfifth.com.example.instagram.models.users.User;
import gearfifth.com.example.instagram.models.users.VerificationToken;

public interface IVerificationTokenService {
    void createVerificationToken(User user, String token);
    VerificationToken getVerificationToken(String verificationToken);
    void delete(User user);
    void delete(String token);
    User activateToken(String token);
}
