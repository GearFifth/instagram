package gearfifth.com.example.utils;

import gearfifth.com.example.models.users.User;

public interface IEmailService {
    public void sendEmail(String to, String subject, String body);
    public void sendActivationEmail(User user, String token);
}
