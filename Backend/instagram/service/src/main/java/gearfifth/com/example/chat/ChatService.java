package gearfifth.com.example.chat;

import gearfifth.com.example.dtos.chat.CreateMessageRequest;
import gearfifth.com.example.dtos.chat.MessageResponse;
import gearfifth.com.example.models.chat.Message;
import gearfifth.com.example.models.users.User;
import gearfifth.com.example.repositories.chat.IMessageRepository;
import gearfifth.com.example.repositories.users.IUserRepository;
import gearfifth.com.example.users.IUserService;
import lombok.RequiredArgsConstructor;
import org.apache.catalina.mapper.Mapper;
import org.modelmapper.ModelMapper;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ChatService implements IChatService {
    private final SimpMessagingTemplate messagingTemplate;
    private final IMessageRepository messageRepository;
    private final IUserService userService;
    private final ModelMapper mapper;

    public void processMessage(CreateMessageRequest request) {
        User sender = userService.findUserOrThrow(request.getSenderId());
        User receiver = userService.findUserOrThrow(request.getReceiverId());

        Message msg = new Message();
        msg.setSender(sender);
        msg.setReceiver(receiver);
        msg.setContent(request.getContent());
        msg.setTimestamp(new Date());
        msg.setRead(false);

        MessageResponse response = mapper.map(messageRepository.save(msg), MessageResponse.class);

//        messagingTemplate.convertAndSendToUser(
//                receiver.getEmail(),
//                "/queue/messages",
//                response
//        );
        messagingTemplate.convertAndSend(
                "/messages",
                response
        );
    }

    @Override
    public Collection<MessageResponse> getMessagesBetweenUsers(UUID user1Id, UUID user2Id) {
        User user1 = userService.findUserOrThrow(user1Id);
        User user2 = userService.findUserOrThrow(user2Id);

        Collection<Message> messages = messageRepository.getChatMessages(user1, user2);
        return messages.stream()
                .map(msg -> mapper.map(msg, MessageResponse.class))
                .toList();
    }
}
