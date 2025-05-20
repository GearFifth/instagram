package gearfifth.com.example.repositories;

import gearfifth.com.example.models.users.User;
import gearfifth.com.example.models.users.VerificationToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface IVerificationTokenRepository extends JpaRepository<VerificationToken, UUID> {
    Optional<VerificationToken> findByToken(String token);
    Optional<VerificationToken>  findByUser(User user);
}
