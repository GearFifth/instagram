package gearfifth.com.example.instagram.models.users;

import jakarta.persistence.*;
import lombok.Data;


import java.sql.Timestamp;
import java.util.Calendar;
import java.util.Date;
import java.util.UUID;


@Entity
@Data
public class VerificationToken {

    private static final long EXPIRATION = 60 * 24 * 60 * 1000;

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String token;

    @OneToOne
    private User user;

    private Date expiryDate;

    private Date calculateExpiryDate(int expiryTimeInMinutes) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(new Timestamp(cal.getTime().getTime()));
        cal.add(Calendar.MINUTE, expiryTimeInMinutes);
        return new Date(cal.getTime().getTime());
    }

    public VerificationToken(){}

    public VerificationToken(String token, User user) {
        this.token = token;
        this.user = user;
        this.expiryDate = calculateExpiryDate((int) (EXPIRATION / (60 * 1000)));
    }
}
