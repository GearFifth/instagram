package gearfifth.com.example.repositories.posts;

import gearfifth.com.example.models.posts.Post;
import gearfifth.com.example.models.users.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

@Repository
public interface IPostRepository extends JpaRepository<Post, UUID> {
    Page<Post> findAllByAuthorId(UUID authorId, Pageable pageable);
    Page<Post> findByAuthorIn(Collection<User> authors, Pageable pageable);
}