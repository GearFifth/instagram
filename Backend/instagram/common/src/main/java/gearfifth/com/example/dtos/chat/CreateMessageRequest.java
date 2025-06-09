package gearfifth.com.example.dtos.chat;

import lombok.Data;

import java.util.Date;
import java.util.UUID;

@Data
public class CreateMessageRequest {
    private UUID senderId;
    private UUID receiverId;
    private String content;
}
