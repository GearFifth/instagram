package gearfifth.com.example.instagram.services.verification;

import gearfifth.com.example.instagram.models.users.User;

public interface IEmailService {
    public void sendEmail(String to, String subject, String body);
    public void sendActivationEmail(User user, String token);

}
