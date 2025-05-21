package gearfifth.com.example.verification;

import gearfifth.com.example.exceptions.VerificationTokenException;
import gearfifth.com.example.models.users.User;
import gearfifth.com.example.models.users.VerificationToken;
import gearfifth.com.example.repositories.users.IUserRepository;
import gearfifth.com.example.repositories.users.IVerificationTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Calendar;

@Service
@RequiredArgsConstructor
public class VerificationTokenService implements IVerificationTokenService {

    private final IVerificationTokenRepository repository;
    private final IUserRepository userRepository;


    @Override
    public void createVerificationToken(User user, String token) {
        VerificationToken myToken = new VerificationToken(token, user);
        repository.save(myToken);
    }

    @Override
    public VerificationToken getVerificationToken(String verificationToken) {
        return repository.findByToken(verificationToken)
                .orElseThrow(() -> new VerificationTokenException("Invalid verification token"));
    }

    @Override
    public void delete(String token) {
        repository.delete(repository.findByToken(token)
                .orElseThrow(() -> new VerificationTokenException("Invalid verification token")));
    }

    @Override
    public void activateToken(String token) {
        VerificationToken verificationToken = getVerificationToken(token);

        User user = verificationToken.getUser();
        if (verificationToken.getExpiryDate().before(Calendar.getInstance().getTime())) {
            throw new VerificationTokenException("Verification token has expired");
        }

        user.setEnabled(true);
        delete(token);
        userRepository.save(user);
    }

}
