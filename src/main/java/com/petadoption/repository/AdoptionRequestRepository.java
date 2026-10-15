package com.petadoption.repository;

import com.petadoption.model.AdoptionRequest;
import com.petadoption.model.RequestStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdoptionRequestRepository extends JpaRepository<AdoptionRequest, Long> {

    List<AdoptionRequest> findByUserIdOrderByRequestDateDesc(Long userId);

    List<AdoptionRequest> findByPetId(Long petId);

    List<AdoptionRequest> findByStatusOrderByRequestDateDesc(RequestStatus status);

    List<AdoptionRequest> findAllByOrderByRequestDateDesc();
}
