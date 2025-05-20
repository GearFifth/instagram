package gearfifth.com.example.dtos.followers;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.UUID;

@Data
public class FollowRequest {
    @NotNull(message = "fromUserId is required")
    private UUID fromUserId;

    @NotNull(message = "toUserId is required")
    private UUID toUserId;
}
