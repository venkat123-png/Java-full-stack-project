package com.petadoption.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "adoption_requests")
public class AdoptionRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "pet_id", nullable = false)
    private Pet pet;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "adopter_name", nullable = false, length = 100)
    private String adopterName;

    @Column(name = "adopter_email", nullable = false, length = 100)
    private String adopterEmail;

    @Column(name = "adopter_phone", nullable = false, length = 20)
    private String adopterPhone;

    @Column(name = "home_type", length = 100)
    private String homeType; // Apartment, House with Yard, Farm, etc.

    @Column(name = "has_other_pets")
    private Boolean hasOtherPets = false;

    @Column(columnDefinition = "TEXT")
    private String reason;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RequestStatus status = RequestStatus.PENDING;

    @Column(name = "request_date", updatable = false)
    private LocalDateTime requestDate = LocalDateTime.now();

    @Column(name = "admin_notes", columnDefinition = "TEXT")
    private String adminNotes;

    public AdoptionRequest() {
    }

    public AdoptionRequest(Pet pet, User user, String adopterName, String adopterEmail,
                           String adopterPhone, String homeType, Boolean hasOtherPets,
                           String reason) {
        this.pet = pet;
        this.user = user;
        this.adopterName = adopterName;
        this.adopterEmail = adopterEmail;
        this.adopterPhone = adopterPhone;
        this.homeType = homeType;
        this.hasOtherPets = hasOtherPets != null ? hasOtherPets : false;
        this.reason = reason;
        this.status = RequestStatus.PENDING;
        this.requestDate = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Pet getPet() {
        return pet;
    }

    public void setPet(Pet pet) {
        this.pet = pet;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getAdopterName() {
        return adopterName;
    }

    public void setAdopterName(String adopterName) {
        this.adopterName = adopterName;
    }

    public String getAdopterEmail() {
        return adopterEmail;
    }

    public void setAdopterEmail(String adopterEmail) {
        this.adopterEmail = adopterEmail;
    }

    public String getAdopterPhone() {
        return adopterPhone;
    }

    public void setAdopterPhone(String adopterPhone) {
        this.adopterPhone = adopterPhone;
    }

    public String getHomeType() {
        return homeType;
    }

    public void setHomeType(String homeType) {
        this.homeType = homeType;
    }

    public Boolean getHasOtherPets() {
        return hasOtherPets;
    }

    public void setHasOtherPets(Boolean hasOtherPets) {
        this.hasOtherPets = hasOtherPets;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public RequestStatus getStatus() {
        return status;
    }

    public void setStatus(RequestStatus status) {
        this.status = status;
    }

    public LocalDateTime getRequestDate() {
        return requestDate;
    }

    public void setRequestDate(LocalDateTime requestDate) {
        this.requestDate = requestDate;
    }

    public String getAdminNotes() {
        return adminNotes;
    }

    public void setAdminNotes(String adminNotes) {
        this.adminNotes = adminNotes;
    }
}
