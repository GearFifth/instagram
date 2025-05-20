package gearfifth.com.example.dtos.users.requests;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UserUpdateRequest {

    @Email(message = "Invalid email format")
    @NotBlank(message = "Email is required")
    private String email;

    @NotBlank(message = "First name is required")
    @Size(max = 50, message = "First name must not exceed 50 characters")
    private String firstName;

    @NotBlank(message = "Last name is required")
    @Size(max = 50, message = "Last name must not exceed 50 characters")
    private String lastName;

    @Size(max = 100, message = "Address must not exceed 100 characters")
    private String address;

    @Pattern(
            regexp = "^\\+?[0-9]{7,15}$",
            message = "Invalid phone number format. It must be 7 to 15 digits long and can optionally start with a '+' sign."
    )
    private String phoneNumber;
}