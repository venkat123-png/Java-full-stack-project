// ========================================================
// API Client & Session Management for Pet Adoption System
// ========================================================

const API_BASE_URL = window.location.origin.includes('localhost') || window.location.origin.includes('127.0.0.1')
    ? `${window.location.origin}/api`
    : 'http://localhost:8080/api';

// Authentication Helper
const Auth = {
    getUser() {
        try {
            const data = localStorage.getItem('pet_user');
            return data ? JSON.parse(data) : null;
        } catch (e) {
            return null;
        }
    },

    setUser(user) {
        localStorage.setItem('pet_user', JSON.stringify(user));
    },

    logout() {
        localStorage.removeItem('pet_user');
        window.location.href = 'login.html';
    },

    isLoggedIn() {
        return this.getUser() !== null;
    },

    isAdmin() {
        const user = this.getUser();
        return user && user.role === 'ADMIN';
    }
};

// Toast Alert System
function showToast(message, type = 'success') {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    const bgClass = type === 'success' ? 'bg-success' : type === 'danger' ? 'bg-danger' : 'bg-primary';
    toast.className = `toast align-items-center text-white ${bgClass} border-0 show mb-2 shadow`;
    toast.setAttribute('role', 'alert');
    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body fw-medium">${message}</div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
    `;
    container.appendChild(toast);
    setTimeout(() => {
        toast.remove();
    }, 4000);
}

// API Service Layer
const Api = {
    async request(endpoint, options = {}) {
        const url = `${API_BASE_URL}${endpoint}`;
        const headers = {
            'Content-Type': 'application/json',
            ...(options.headers || {})
        };

        const config = {
            ...options,
            headers
        };

        try {
            const response = await fetch(url, config);
            const contentType = response.headers.get('content-type');
            let data = null;
            if (contentType && contentType.includes('application/json')) {
                data = await response.json();
            } else {
                data = await response.text();
            }

            if (!response.ok) {
                const errorMessage = (data && data.error) ? data.error : (typeof data === 'string' && data ? data : `Error ${response.status}`);
                throw new Error(errorMessage);
            }
            return data;
        } catch (error) {
            console.error(`API Error [${endpoint}]:`, error);
            throw error;
        }
    },

    // Auth APIs
    login(credentials) {
        return this.request('/auth/login', {
            method: 'POST',
            body: JSON.stringify(credentials)
        });
    },

    register(userData) {
        return this.request('/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData)
        });
    },

    // Pet APIs
    getAllPets() {
        return this.request('/pets');
    },

    getAvailablePets() {
        return this.request('/pets/available');
    },

    getAdoptedPets() {
        return this.request('/pets/adopted');
    },

    getPetById(id) {
        return this.request(`/pets/${id}`);
    },

    searchPets(species, status, keyword) {
        const params = new URLSearchParams();
        if (species && species !== 'ALL') params.append('species', species);
        if (status) params.append('status', status);
        if (keyword) params.append('keyword', keyword);
        return this.request(`/pets/search?${params.toString()}`);
    },

    createPet(petData) {
        return this.request('/pets', {
            method: 'POST',
            body: JSON.stringify(petData)
        });
    },

    updatePet(id, petData) {
        return this.request(`/pets/${id}`, {
            method: 'PUT',
            body: JSON.stringify(petData)
        });
    },

    deletePet(id) {
        return this.request(`/pets/${id}`, {
            method: 'DELETE'
        });
    },

    // Adoption Request APIs
    submitAdoption(applicationData) {
        return this.request('/adoptions', {
            method: 'POST',
            body: JSON.stringify(applicationData)
        });
    },

    getAllAdoptionRequests() {
        return this.request('/adoptions');
    },

    getMyAdoptionRequests(userId) {
        return this.request(`/adoptions/my/${userId}`);
    },

    updateRequestStatus(requestId, status, adminNotes = '') {
        return this.request(`/adoptions/${requestId}/status`, {
            method: 'PATCH',
            body: JSON.stringify({ status, adminNotes })
        });
    }
};

// Update Navbar Links according to Auth state
function setupNavbar() {
    const user = Auth.getUser();
    const navAuthContainer = document.getElementById('nav-auth-container');
    const adminLink = document.getElementById('nav-admin-link');
    const dashboardLink = document.getElementById('nav-dashboard-link');

    if (adminLink) {
        adminLink.style.display = Auth.isAdmin() ? 'block' : 'none';
    }

    if (dashboardLink) {
        dashboardLink.style.display = Auth.isLoggedIn() ? 'block' : 'none';
    }

    if (navAuthContainer) {
        if (user) {
            navAuthContainer.innerHTML = `
                <div class="d-flex align-items-center gap-2">
                    <span class="badge ${user.role === 'ADMIN' ? 'bg-warning text-dark' : 'bg-primary'} p-2">
                        <i class="bi bi-person-fill"></i> ${user.fullName} (${user.role})
                    </span>
                    <button class="btn btn-outline-danger btn-sm" onclick="Auth.logout()">
                        <i class="bi bi-box-arrow-right"></i> Logout
                    </button>
                </div>
            `;
        } else {
            navAuthContainer.innerHTML = `
                <a href="login.html" class="btn btn-outline-primary btn-sm px-3">
                    <i class="bi bi-box-arrow-in-right"></i> Login / Register
                </a>
            `;
        }
    }
}

document.addEventListener('DOMContentLoaded', setupNavbar);
