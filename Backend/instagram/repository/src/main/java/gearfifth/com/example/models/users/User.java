package gearfifth.com.example.models.users;

import gearfifth.com.example.enums.UserRole;
import gearfifth.com.example.models.posts.Comment;
import gearfifth.com.example.models.posts.Post;
import gearfifth.com.example.models.shared.Image;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Data
@Table(name ="users")
public class User {
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
}