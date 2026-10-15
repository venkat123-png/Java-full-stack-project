// ========================================================
// Main Page Script: Pet Catalog, Filters & Adoption Form
// ========================================================

let currentPets = [];
let petDetailsModalInstance = null;
let adoptionModalInstance = null;

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Modals
    const detailModalEl = document.getElementById('petDetailsModal');
    if (detailModalEl) {
        petDetailsModalInstance = new bootstrap.Modal(detailModalEl);
    }

    const adoptModalEl = document.getElementById('adoptionModal');
    if (adoptModalEl) {
        adoptionModalInstance = new bootstrap.Modal(adoptModalEl);
    }

    // Attach Search / Filter Events
    const searchBtn = document.getElementById('search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', applyFilters);
    }

    const keywordInput = document.getElementById('keyword-search');
    if (keywordInput) {
        keywordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') applyFilters();
        });
    }

    const speciesFilter = document.getElementById('species-filter');
    if (speciesFilter) {
        speciesFilter.addEventListener('change', applyFilters);
    }

    const statusFilter = document.getElementById('status-filter');
    if (statusFilter) {
        statusFilter.addEventListener('change', applyFilters);
    }

    // Attach Adoption Form Submission
    const adoptionForm = document.getElementById('adoption-form');
    if (adoptionForm) {
        adoptionForm.addEventListener('submit', handleAdoptionSubmit);
    }

    // Initial Load
    loadPets();
});

async function loadPets() {
    try {
        const container = document.getElementById('pets-container');
        if (!container) return;

        container.innerHTML = `
            <div class="col-12 text-center py-5">
                <div class="spinner-border text-primary" role="status"></div>
                <p class="mt-2 text-muted">Fetching lovable pets...</p>
            </div>
        `;

        currentPets = await Api.getAllPets();
        renderPets(currentPets);
    } catch (error) {
        console.error('Error fetching pets:', error);
        showToast('Failed to load pets from server: ' + error.message, 'danger');
        const container = document.getElementById('pets-container');
        if (container) {
            container.innerHTML = `
                <div class="col-12 text-center py-5 text-danger">
                    <i class="bi bi-exclamation-triangle-fill fs-2"></i>
                    <p class="mt-2">Could not connect to Spring Boot backend. Please verify the server is running on port 8080.</p>
                </div>
            `;
        }
    }
}

async function applyFilters() {
    const species = document.getElementById('species-filter')?.value || '';
    const status = document.getElementById('status-filter')?.value || '';
    const keyword = document.getElementById('keyword-search')?.value.trim() || '';

    try {
        currentPets = await Api.searchPets(species, status, keyword);
        renderPets(currentPets);
    } catch (error) {
        showToast('Filter search error: ' + error.message, 'danger');
    }
}

function resetFilters() {
    if (document.getElementById('species-filter')) document.getElementById('species-filter').value = 'ALL';
    if (document.getElementById('status-filter')) document.getElementById('status-filter').value = 'AVAILABLE';
    if (document.getElementById('keyword-search')) document.getElementById('keyword-search').value = '';
    applyFilters();
}

function formatAge(ageMonths) {
    if (!ageMonths) return 'Unknown age';
    if (ageMonths < 12) return `${ageMonths} mo`;
    const years = Math.floor(ageMonths / 12);
    const remMonths = ageMonths % 12;
    return remMonths > 0 ? `${years}y ${remMonths}m` : `${years} yr${years > 1 ? 's' : ''}`;
}

function renderPets(pets) {
    const container = document.getElementById('pets-container');
    const emptyState = document.getElementById('no-pets-found');
    const countBadge = document.getElementById('pets-count-badge');

    if (!container) return;

    if (countBadge) {
        countBadge.innerText = `${pets.length} Pet${pets.length === 1 ? '' : 's'} Found`;
    }

    if (!pets || pets.length === 0) {
        container.innerHTML = '';
        if (emptyState) emptyState.classList.remove('d-none');
        return;
    }

    if (emptyState) emptyState.classList.add('d-none');

    container.innerHTML = pets.map(pet => {
        let badgeClass = 'status-available';
        let statusText = 'Available';
        if (pet.status === 'PENDING') {
            badgeClass = 'status-pending';
            statusText = 'Adoption Pending';
        } else if (pet.status === 'ADOPTED') {
            badgeClass = 'status-adopted';
            statusText = 'Adopted ❤️';
        }

        const fallbackImg = 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80';
        const imgUrl = pet.imageUrl || fallbackImg;

        return `
            <div class="col-md-6 col-lg-4">
                <div class="pet-card">
                    <div class="pet-card-img-wrapper">
                        <img src="${imgUrl}" alt="${pet.name}" class="pet-card-img" onerror="this.src='${fallbackImg}'">
                        <span class="status-badge ${badgeClass}">${statusText}</span>
                    </div>
                    <div class="card-body p-4 d-flex flex-column justify-content-between flex-grow-1">
                        <div>
                            <div class="d-flex justify-content-between align-items-center mb-1">
                                <h4 class="fw-bold mb-0">${pet.name}</h4>
                                <span class="badge bg-light text-dark border">${pet.species}</span>
                            </div>
                            <p class="text-muted small mb-2"><i class="bi bi-geo-alt-fill text-danger"></i> ${pet.location || 'Shelter'}</p>
                            
                            <div class="mb-3">
                                <span class="pet-meta-tag"><i class="bi bi-bookmark-fill"></i> ${pet.breed || 'Mixed'}</span>
                                <span class="pet-meta-tag"><i class="bi bi-calendar-event"></i> ${formatAge(pet.ageMonths)}</span>
                                <span class="pet-meta-tag"><i class="bi bi-gender-ambiguous"></i> ${pet.gender || 'Unknown'}</span>
                            </div>

                            <p class="text-secondary small text-truncate-2 mb-3" style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                                ${pet.description || 'Gentle and loving pet waiting for a responsible companion.'}
                            </p>
                        </div>

                        <div class="d-flex gap-2 pt-2 border-top">
                            <button class="btn btn-outline-primary btn-sm flex-grow-1" onclick="openPetDetails(${pet.id})">
                                <i class="bi bi-info-circle"></i> Details
                            </button>
                            ${pet.status === 'AVAILABLE' ? `
                                <button class="btn btn-primary btn-sm flex-grow-1" onclick="openAdoptionModal(${pet.id})">
                                    <i class="bi bi-heart-fill"></i> Adopt Me
                                </button>
                            ` : `
                                <button class="btn btn-secondary btn-sm flex-grow-1" disabled>
                                    ${pet.status === 'ADOPTED' ? 'Adopted' : 'Pending'}
                                </button>
                            `}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function openPetDetails(petId) {
    const pet = currentPets.find(p => p.id === petId);
    if (!pet) return;

    document.getElementById('detail-pet-name').innerText = `${pet.name}'s Profile`;
    document.getElementById('detail-name-heading').innerText = pet.name;
    document.getElementById('detail-pet-image').src = pet.imageUrl || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80';
    document.getElementById('detail-location').innerText = pet.location || 'Shelter Facility';
    document.getElementById('detail-species').innerText = pet.species;
    document.getElementById('detail-breed').innerText = pet.breed || 'Breed Unspecified';
    document.getElementById('detail-age').innerText = formatAge(pet.ageMonths);
    document.getElementById('detail-gender').innerText = pet.gender || 'Unspecified';
    document.getElementById('detail-health').innerText = pet.healthStatus || 'Vet checked, up-to-date vaccinations.';
    document.getElementById('detail-description').innerText = pet.description || 'No description provided.';

    const statusBadge = document.getElementById('detail-status-badge');
    statusBadge.className = `badge ${pet.status === 'AVAILABLE' ? 'bg-success' : pet.status === 'PENDING' ? 'bg-warning text-dark' : 'bg-primary'}`;
    statusBadge.innerText = pet.status;

    const adoptBtn = document.getElementById('detail-adopt-btn');
    if (pet.status === 'AVAILABLE') {
        adoptBtn.style.display = 'inline-block';
        adoptBtn.onclick = () => {
            petDetailsModalInstance.hide();
            openAdoptionModal(pet.id);
        };
    } else {
        adoptBtn.style.display = 'none';
    }

    petDetailsModalInstance.show();
}

function openAdoptionModal(petId) {
    const pet = currentPets.find(p => p.id === petId);
    if (!pet) return;

    document.getElementById('apply-pet-id').value = pet.id;
    document.getElementById('apply-pet-name').innerText = `${pet.name} (${pet.breed || pet.species})`;

    // If user is logged in, auto-populate contact details
    const user = Auth.getUser();
    if (user) {
        document.getElementById('apply-name').value = user.fullName || '';
        document.getElementById('apply-email').value = user.email || '';
        document.getElementById('apply-phone').value = user.phone || '';
    }

    adoptionModalInstance.show();
}

async function handleAdoptionSubmit(e) {
    e.preventDefault();

    const petId = parseInt(document.getElementById('apply-pet-id').value);
    const user = Auth.getUser();

    const applicationData = {
        petId: petId,
        userId: user ? user.id : null,
        adopterName: document.getElementById('apply-name').value.trim(),
        adopterEmail: document.getElementById('apply-email').value.trim(),
        adopterPhone: document.getElementById('apply-phone').value.trim(),
        homeType: document.getElementById('apply-home-type').value,
        hasOtherPets: document.getElementById('apply-has-pets').checked,
        reason: document.getElementById('apply-reason').value.trim()
    };

    const submitBtn = document.getElementById('apply-submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Submitting...';

    try {
        await Api.submitAdoption(applicationData);
        adoptionModalInstance.hide();
        showToast('🎉 Adoption request submitted successfully! The shelter admin will review it.', 'success');
        
        // Reset form & reload pets list
        document.getElementById('adoption-form').reset();
        await loadPets();
    } catch (error) {
        showToast('Submission failed: ' + error.message, 'danger');
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
    }
}
