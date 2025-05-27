package gearfifth.com.example.chat;

import gearfifth.com.example.dtos.chat.CreateMessageRequest;
import gearfifth.com.example.dtos.chat.MessageResponse;

import java.util.Collection;
import java.util.UUID;

public interface IChatService {
    void processMessage(CreateMessageRequest request);
    Collection<MessageResponse> getMessagesBetweenUsers(UUID user1Id, UUID user2Id);
}
