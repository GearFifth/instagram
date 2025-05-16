package gearfifth.com.example.instagram.models.posts;

import jakarta.persistence.Embeddable;
import jakarta.persistence.Enumerated;
import lombok.Data;

import java.util.UUID;

@Data
@Embeddable
public class Reaction {
    private UUID userId;
    @Enumerated
    private ReactionType type;
}