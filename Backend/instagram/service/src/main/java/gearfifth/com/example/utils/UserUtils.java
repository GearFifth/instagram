package gearfifth.com.example.utils;

import gearfifth.com.example.exceptions.InvalidArgumentsException;
import gearfifth.com.example.exceptions.UserNotFoundException;
import gearfifth.com.example.models.users.User;
import gearfifth.com.example.models.users.UserPrincipal;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class UserUtils {

    public static User getLoggedUserOrThrow() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null && authentication.getPrincipal() instanceof UserPrincipal) {
            UserPrincipal principal = (UserPrincipal) authentication.getPrincipal();
            if (principal == null) {
                throw new InvalidArgumentsException("User is not logged in");
            }
            return principal.getUser();
        }
        throw new InvalidArgumentsException("User is not logged in");
    }

}
