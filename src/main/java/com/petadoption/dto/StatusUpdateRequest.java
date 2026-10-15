package com.petadoption.dto;

import com.petadoption.model.RequestStatus;
import jakarta.validation.constraints.NotNull;

public class StatusUpdateRequest {

    @NotNull(message = "Status is required")
    private RequestStatus status; // APPROVED or REJECTED

    private String adminNotes;

    public StatusUpdateRequest() {
    }

    public StatusUpdateRequest(RequestStatus status, String adminNotes) {
        this.status = status;
        this.adminNotes = adminNotes;
    }

    public RequestStatus getStatus() {
        return status;
    }

    public void setStatus(RequestStatus status) {
        this.status = status;
    }

    public String getAdminNotes() {
        return adminNotes;
    }

    public void setAdminNotes(String adminNotes) {
        this.adminNotes = adminNotes;
    }
}
