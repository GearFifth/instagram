package gearfifth.com.example.instagram.models.shared;

import jakarta.persistence.*;
import lombok.Data;

import java.util.UUID;

@Entity
@Data
@Table(name = "images")
public class Image {
    @Id
    private UUID id;
    private String path;
    private String originalName;
}
