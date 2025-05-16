package gearfifth.com.example.instagram.repositories.shared;

import gearfifth.com.example.instagram.models.shared.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;


@Repository
public interface IImageRepository extends JpaRepository<Image, UUID> {

}
