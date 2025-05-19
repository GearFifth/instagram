package gearfifth.com.example.instagram.repositories.posts;

import gearfifth.com.example.instagram.models.posts.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ICommentRepository extends JpaRepository<Comment, UUID> {
}