package gearfifth.com.example.models.users;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import java.util.Date;
import java.util.UUID;

@Entity
@Data
@SQLDelete(sql = "UPDATE follow SET deleted = true WHERE id = ?")
@Where(clause = "deleted = false")
public class Follow{
    @Id
    @GeneratedValue(strategy=GenerationType.UUID)
    private UUID id;

    @ManyToOne
    @JoinColumn(name="from_user_fk")
    private User from;

    @ManyToOne
    @JoinColumn(name="to_user_fk")
    private User to;

    @Column(name = "deleted", nullable = false)
    private boolean deleted = false;

    private Date deletedAt;

    public Follow() {};

    public Follow(User from, User to) {
        this.from = from;
        this.to = to;
    }
}
