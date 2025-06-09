package gearfifth.com.example.repositories.users;

import gearfifth.com.example.models.users.Follow;
import gearfifth.com.example.models.users.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface IFollowRepository extends JpaRepository<Follow, UUID> {
    boolean existsByFromAndTo(User from, User to);
    Optional<Follow> findByFromAndTo(User from, User to);
    boolean existsByFromIdAndToId(UUID fromId, UUID toId);

    @Query("SELECT f.to FROM Follow f WHERE f.from.id = :userId")
    List<User> findUsersFollowedBy(@Param("userId") UUID userId);
}
