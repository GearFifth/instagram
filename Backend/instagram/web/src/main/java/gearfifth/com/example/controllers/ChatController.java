package gearfifth.com.example.controllers;

import gearfifth.com.example.chat.IChatService;
import gearfifth.com.example.dtos.chat.CreateMessageRequest;
import gearfifth.com.example.dtos.chat.MessageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/v1/chat")
public class ChatController {
    private final IChatService chatService;

    @MessageMapping("/chat")
    public void processMessage(CreateMessageRequest request) {
        chatService.processMessage(request);
    }

    @GetMapping("/history")
    public ResponseEntity<Collection<MessageResponse>> getMessagesBetweenUsers(
            @RequestParam("user1Id") UUID user1Id,
            @RequestParam("user2Id") UUID user2Id) {

        return ResponseEntity.ok(chatService.getMessagesBetweenUsers(user1Id, user2Id));
    }
}