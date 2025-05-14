package gearfifth.com.example.instagram.services;

import gearfifth.com.example.instagram.models.User;
import org.springframework.web.server.ResponseStatusException;

import java.util.Collection;
import java.util.UUID;

public interface IUserService {
    Collection<User> getAll();
    User get(UUID userId);
    User update(User user) ;
    User remove(UUID userId);
    User getByEmail(String email);
}
