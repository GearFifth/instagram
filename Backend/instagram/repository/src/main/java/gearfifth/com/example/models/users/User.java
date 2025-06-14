package gearfifth.com.example.models.users;

import gearfifth.com.example.enums.UserRole;
import gearfifth.com.example.models.posts.Post;
import gearfifth.com.example.models.shared.Image;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Entity
@Data
@Table(name ="users")
@SQLDelete(sql = "UPDATE users SET deleted = true WHERE id = ?")
@Where(clause = "deleted = false")
public class User{
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(unique = true)
    private String email;

    private String password;

    private String firstName;

    private String lastName;

    private String address;

    private String phoneNumber;

    private UserRole role = UserRole.USER;

    @Column(name = "enabled")
    private boolean enabled = false;

    @OneToOne
    private Image profileImage;

    @OneToMany(mappedBy="to")
    private List<Follow> followers;

    @OneToMany(mappedBy="from")
    private List<Follow> following;

    @OneToMany(mappedBy = "author", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Post> posts;

    @Column(name = "deleted", nullable = false)
    private boolean deleted = false;

    private Date deletedAt;
}