package gearfifth.com.example.dtos.images;

import lombok.Data;

import java.util.UUID;

@Data
public class ImageDetailsResponse {
    private UUID id;
    private String path;
    private String originalName;

    public ImageDetailsResponse() {}

    public ImageDetailsResponse(UUID id, String path, String originalName) {
        this.id = id;
        this.path = path;
        this.originalName = originalName;
    }

}
