package gearfifth.com.example.repositories.shared;

import gearfifth.com.example.models.shared.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;


@Repository
public interface IImageRepository extends JpaRepository<Image, UUID> {

}
