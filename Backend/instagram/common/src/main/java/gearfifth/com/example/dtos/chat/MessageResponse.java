package gearfifth.com.example.dtos.chat;

import gearfifth.com.example.dtos.IdReference;
import gearfifth.com.example.dtos.users.responses.UserProfileResponse;
import lombok.Data;

import java.util.Date;
import java.util.UUID;

@Data
public class MessageResponse {
    private UserProfileResponse sender;
    private UserProfileResponse receiver;
    private String content;
    private Date timestamp;
}
