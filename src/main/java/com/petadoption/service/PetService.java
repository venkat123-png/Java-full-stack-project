package com.petadoption.service;

import com.petadoption.model.Pet;
import com.petadoption.model.PetStatus;
import com.petadoption.repository.PetRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PetService {

    private final PetRepository petRepository;

    public PetService(PetRepository petRepository) {
        this.petRepository = petRepository;
    }

    public List<Pet> getAllPets() {
        return petRepository.findAll();
    }

    public List<Pet> getAvailablePets() {
        return petRepository.findByStatus(PetStatus.AVAILABLE);
    }

    public List<Pet> getAdoptedPets() {
        return petRepository.findByStatus(PetStatus.ADOPTED);
    }

    public Pet getPetById(Long id) {
        return petRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Pet not found with id: " + id));
    }

    public Pet createPet(Pet pet) {
        if (pet.getStatus() == null) {
            pet.setStatus(PetStatus.AVAILABLE);
        }
        return petRepository.save(pet);
    }

    public Pet updatePet(Long id, Pet petDetails) {
        Pet pet = getPetById(id);
        pet.setName(petDetails.getName());
        pet.setSpecies(petDetails.getSpecies());
        pet.setBreed(petDetails.getBreed());
        pet.setAgeMonths(petDetails.getAgeMonths());
        pet.setGender(petDetails.getGender());
        pet.setHealthStatus(petDetails.getHealthStatus());
        pet.setDescription(petDetails.getDescription());
        pet.setImageUrl(petDetails.getImageUrl());
        pet.setLocation(petDetails.getLocation());
        if (petDetails.getStatus() != null) {
            pet.setStatus(petDetails.getStatus());
        }
        return petRepository.save(pet);
    }

    public void deletePet(Long id) {
        if (!petRepository.existsById(id)) {
            throw new IllegalArgumentException("Pet not found with id: " + id);
        }
        petRepository.deleteById(id);
    }

    public List<Pet> searchPets(String species, PetStatus status, String keyword) {
        String cleanSpecies = (species != null && !species.trim().isEmpty() && !species.equalsIgnoreCase("all"))
                ? species.trim() : null;
        String cleanKeyword = (keyword != null && !keyword.trim().isEmpty())
                ? keyword.trim() : null;

        return petRepository.searchPets(cleanSpecies, status, cleanKeyword);
    }
}
