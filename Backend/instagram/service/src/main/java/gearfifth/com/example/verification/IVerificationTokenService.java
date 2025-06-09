package gearfifth.com.example.verification;

import gearfifth.com.example.models.users.User;
import gearfifth.com.example.models.users.VerificationToken;

public interface IVerificationTokenService {
    void createVerificationToken(User user, String token);
    VerificationToken getVerificationToken(String verificationToken);
    void delete(String token);
    void activateToken(String token);
}
