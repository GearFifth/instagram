package gearfifth.com.example.models.posts;

import gearfifth.com.example.enums.ReactionType;
import gearfifth.com.example.models.shared.Image;
import gearfifth.com.example.models.users.User;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;

import jakarta.persistence.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import java.util.*;

@Entity
@Data
@Table(name = "posts")
@SQLDelete(sql = "UPDATE posts SET deleted = true WHERE id = ?")
@Where(clause = "deleted = false")
public class Post{
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String description;

    private Date creationDate;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> comments = new ArrayList<>();

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    private Image image;

    @ElementCollection
    @MapKeyColumn(name = "user_id")
    @Column(name = "reaction_type")
    @CollectionTable(name = "post_reactions", joinColumns = @JoinColumn(name = "post_id"))
    private Map<UUID, ReactionType> reactions = new HashMap<>();

    @ManyToOne()
    @JoinColumn(name = "author_id", nullable = false)
    private User author;

    @Column(name = "deleted", nullable = false)
    private boolean deleted = false;

    private Date deletedAt;

    public void addComment(Comment comment) {
        comments.add(comment);
    }

    public void removeComment(Comment comment) {
        comments.remove(comment);
    }

    public void addReaction(Reaction reaction) {
        reactions.put(reaction.getUserId(), reaction.getType());
    }

    public void removeReaction(Reaction reaction) {
        reactions.remove(reaction.getUserId());
    }

    @Override
    public String toString() {
        return "Post{id=" + id + ", description='" + description + "'}";
    }
}