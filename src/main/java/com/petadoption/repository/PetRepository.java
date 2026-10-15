package com.petadoption.repository;

import com.petadoption.model.Pet;
import com.petadoption.model.PetStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PetRepository extends JpaRepository<Pet, Long> {

    List<Pet> findByStatus(PetStatus status);

    List<Pet> findBySpeciesIgnoreCase(String species);

    List<Pet> findBySpeciesIgnoreCaseAndStatus(String species, PetStatus status);

    @Query("SELECT p FROM Pet p WHERE " +
           "(:species IS NULL OR LOWER(p.species) = LOWER(:species)) AND " +
           "(:status IS NULL OR p.status = :status) AND " +
           "(:keyword IS NULL OR " +
           " LOWER(p.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           " LOWER(p.breed) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           " LOWER(p.location) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    List<Pet> searchPets(@Param("species") String species,
                         @Param("status") PetStatus status,
                         @Param("keyword") String keyword);
}
