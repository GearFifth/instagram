package gearfifth.com.example.utils;

import gearfifth.com.example.exceptions.FileStorageException;
import gearfifth.com.example.models.users.User;
import gearfifth.com.example.verification.IVerificationTokenService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;

@Service
@RequiredArgsConstructor
public class EmailService implements IEmailService {

    private final JavaMailSender javaMailSender;
    private final IVerificationTokenService tokenService;

    @Value("${app.frontend.origin}")
    private String frontendOrigin;

    @Override
    public void sendEmail(String to, String subject, String body) {
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(body, true);

            javaMailSender.send(message);
        } catch (MessagingException e) {
            throw new RuntimeException("Failed to send email", e);
        }
    }

    @Override
    public void sendActivationEmail(User user, String token) {

        String confirmationUrl = frontendOrigin + "/auth/verify-email?token=" + token;
        String body = """
            <p>Hello, <strong>%s</strong>!</p>
            <p>Please verify your email address by clicking the link below:</p>
            <p><a href="%s">Activate Your Account</a></p>
            <p>If you did not register, please ignore this email.</p>
            """.formatted(user.getFirstName() + " " + user.getLastName(), confirmationUrl);

        String footer = "Instagram Team";
        String subject = "Registration Confirmation";

        String emailContent = getDefaultEmailTemplate(subject, body, footer);
        sendEmail(user.getEmail(), subject, emailContent);
    }

    private String getDefaultEmailTemplate(String title, String body, String footer) {
        try {
            Resource resource = new ClassPathResource("templates/default-email-template.html");
            String template = new String(resource.getInputStream().readAllBytes(), StandardCharsets.UTF_8);
            return template
                    .replace("[[TITLE]]", title)
                    .replace("[[BODY]]", body)
                    .replace("[[FOOTER]]", footer);
        } catch (IOException e) {
            throw new FileStorageException("Failed to load email template", e);
        }
    }

}
