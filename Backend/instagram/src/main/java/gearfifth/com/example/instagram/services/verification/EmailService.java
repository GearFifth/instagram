package gearfifth.com.example.instagram.services.verification;

import gearfifth.com.example.instagram.models.users.User;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class EmailService implements IEmailService {

    private final JavaMailSender javaMailSender;
    private final IVerificationTokenService tokenService;

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

        String confirmationUrl = "http://localhost:4200/users/activate?token=" + token;
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
        return """
            <html>
            <head>
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

                    body {
                        margin: 0;
                        font-family: Roboto, "Helvetica Neue", sans-serif;
                        color: #404040;
                        background-color: #f9f9f9;
                    }
                    .email-container {
                        max-width: 600px;
                        margin: auto;
                        background: white;
                        border-radius: 10px;
                        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                        overflow: hidden;
                    }
                    .email-header {
                        background: #42C202;
                        color: white;
                        text-align: center;
                        padding: 20px;
                        font-size: 24px;
                        font-weight: bold;
                    }
                    .email-body {
                        padding: 20px;
                        font-size: 16px;
                        line-height: 1.6;
                    }
                    .email-body a {
                        color: #42C202;
                        text-decoration: none;
                        font-weight: bold;
                    }
                    .email-body a:hover {
                        text-decoration: underline;
                    }
                    .email-footer {
                        text-align: center;
                        font-size: 12px;
                        color: #808080;
                        padding: 15px;
                        background: #f4f4f4;
                        border-top: 1px solid #e0e0e0;
                    }
                </style>
            </head>
            <body>
                <div class="email-container">
                    <div class="email-header">
                        %s
                    </div>
                    <div class="email-body">
                        %s
                    </div>
                    <div class="email-footer">
                        %s
                    </div>
                </div>
            </body>
            </html>
            """.formatted(title, body, footer);
    }

}
