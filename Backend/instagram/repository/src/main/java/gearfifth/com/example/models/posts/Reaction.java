package gearfifth.com.example.models.posts;

import gearfifth.com.example.enums.ReactionType;
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