package gearfifth.com.example.models.posts;

import gearfifth.com.example.models.users.User;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import java.util.*;

@Entity
@Data
@Table(name = "comments")
@SQLDelete(sql = "UPDATE comments SET deleted = true WHERE id = ?")
@Where(clause = "deleted = false")
public class Comment{
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String content;

    @ManyToOne()
    @JoinColumn(name = "post_id")
    private Post post;

    @ManyToOne()
    @JoinColumn(name = "parent_comment_id")
    private Comment parentComment;

    @OneToMany(mappedBy = "parentComment", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Comment> replies = new ArrayList<>();

    @ManyToOne()
    @JoinColumn(name = "author_id", nullable = false)
    private User author;

    private Date creationDate;

    @Column(name = "deleted", nullable = false)
    private boolean deleted = false;

    private Date deletedAt;

    public void addReply(Comment reply) {
        replies.add(reply);
    }

    public void removeReply(Comment reply) {
        replies.remove(reply);
    }
}