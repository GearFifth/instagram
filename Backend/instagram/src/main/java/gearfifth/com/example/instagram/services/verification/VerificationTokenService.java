package gearfifth.com.example.instagram.services.verification;

import gearfifth.com.example.instagram.exceptions.VerificationTokenException;
import gearfifth.com.example.instagram.models.users.User;
import gearfifth.com.example.instagram.models.users.VerificationToken;
import gearfifth.com.example.instagram.repositories.IUserRepository;
import gearfifth.com.example.instagram.repositories.IVerificationTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
