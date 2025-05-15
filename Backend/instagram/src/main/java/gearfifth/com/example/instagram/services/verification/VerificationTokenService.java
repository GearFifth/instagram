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
        return repository.findByToken(verificationToken);
    }

    @Override
    public void delete(User user) {
        VerificationToken token = repository.findByUser(user);
        if (token == null) return;
        repository.delete(token);
    }

    @Override
    public void delete(String token) {
        repository.delete(repository.findByToken(token));
    }

    @Override
    @Transactional
    public User activateToken(String token) {
        VerificationToken verificationToken = getVerificationToken(token);
        if (verificationToken == null) {
            throw new VerificationTokenException("Invalid verification token");
        }

        User user = verificationToken.getUser();
        Calendar cal = Calendar.getInstance();
        if ((verificationToken.getExpiryDate().getTime() - cal.getTime().getTime()) <= 0) {
            throw new VerificationTokenException("Verification token has expired");
        }

        user.setEnabled(true);
        delete(token);
        userRepository.save(user);

        return user;
    }

}
