package com.petadoption.service;

import com.petadoption.dto.AdoptionApplicationDto;
import com.petadoption.dto.StatusUpdateRequest;
import com.petadoption.model.*;
import com.petadoption.repository.AdoptionRequestRepository;
import com.petadoption.repository.PetRepository;
import com.petadoption.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class AdoptionRequestService {

    private final AdoptionRequestRepository adoptionRequestRepository;
    private final PetRepository petRepository;
    private final UserRepository userRepository;

    public AdoptionRequestService(AdoptionRequestRepository adoptionRequestRepository,
                                  PetRepository petRepository,
                                  UserRepository userRepository) {
        this.adoptionRequestRepository = adoptionRequestRepository;
        this.petRepository = petRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public AdoptionRequest submitApplication(AdoptionApplicationDto dto) {
        Pet pet = petRepository.findById(dto.getPetId())
                .orElseThrow(() -> new IllegalArgumentException("Pet not found with id: " + dto.getPetId()));

        if (pet.getStatus() == PetStatus.ADOPTED) {
            throw new IllegalStateException("Sorry, " + pet.getName() + " has already been adopted!");
        }

        User user = null;
        if (dto.getUserId() != null) {
            user = userRepository.findById(dto.getUserId()).orElse(null);
        }

        if (user == null) {
            // Check if user with this email already exists, else create a guest/user record
            user = userRepository.findByEmail(dto.getAdopterEmail().trim().toLowerCase())
                    .orElseGet(() -> userRepository.save(new User(
                            dto.getAdopterName().trim(),
                            dto.getAdopterEmail().trim().toLowerCase(),
                            "user123", // default temporary password
                            dto.getAdopterPhone(),
                            Role.USER
                    )));
        }

        AdoptionRequest request = new AdoptionRequest(
                pet,
                user,
                dto.getAdopterName(),
                dto.getAdopterEmail(),
                dto.getAdopterPhone(),
                dto.getHomeType(),
                dto.getHasOtherPets(),
                dto.getReason()
        );

        // Optionally mark pet as PENDING
        pet.setStatus(PetStatus.PENDING);
        petRepository.save(pet);

        return adoptionRequestRepository.save(request);
    }

    public List<AdoptionRequest> getAllRequests() {
        return adoptionRequestRepository.findAllByOrderByRequestDateDesc();
    }

    public List<AdoptionRequest> getRequestsByUser(Long userId) {
        return adoptionRequestRepository.findByUserIdOrderByRequestDateDesc(userId);
    }

    public AdoptionRequest getRequestById(Long id) {
        return adoptionRequestRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Adoption request not found with id: " + id));
    }

    @Transactional
    public AdoptionRequest updateRequestStatus(Long id, StatusUpdateRequest updateRequest) {
        AdoptionRequest request = getRequestById(id);
        RequestStatus newStatus = updateRequest.getStatus();

        request.setStatus(newStatus);
        if (updateRequest.getAdminNotes() != null) {
            request.setAdminNotes(updateRequest.getAdminNotes());
        }

        Pet pet = request.getPet();
        if (newStatus == RequestStatus.APPROVED) {
            // Step 6 in workflow: Approved request moves to adopted pets, updates pet status to ADOPTED
            pet.setStatus(PetStatus.ADOPTED);
            petRepository.save(pet);
        } else if (newStatus == RequestStatus.REJECTED) {
            // Revert pet status to AVAILABLE if it was PENDING
            if (pet.getStatus() == PetStatus.PENDING) {
                pet.setStatus(PetStatus.AVAILABLE);
                petRepository.save(pet);
            }
        }

        return adoptionRequestRepository.save(request);
    }
}
