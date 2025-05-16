package gearfifth.com.example.instagram.repositories.posts;

import gearfifth.com.example.instagram.models.posts.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.UUID;

@Repository
public interface IPostRepository extends JpaRepository<Post, UUID> {
}