-- ========================================================
-- Schema Definition for Pet Adoption Management System
-- ========================================================

CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    role VARCHAR(20) NOT NULL DEFAULT 'USER',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS pets (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    species VARCHAR(50) NOT NULL,
    breed VARCHAR(100),
    age_months INT,
    gender VARCHAR(20),
    health_status VARCHAR(100),
    description TEXT,
    image_url VARCHAR(500),
    location VARCHAR(100),
    status VARCHAR(20) NOT NULL DEFAULT 'AVAILABLE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS adoption_requests (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    pet_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    adopter_name VARCHAR(100) NOT NULL,
    adopter_email VARCHAR(100) NOT NULL,
    adopter_phone VARCHAR(20) NOT NULL,
    home_type VARCHAR(100),
    has_other_pets BOOLEAN DEFAULT FALSE,
    reason TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    request_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    admin_notes TEXT,
    CONSTRAINT fk_adoption_pet FOREIGN KEY (pet_id) REFERENCES pets (id) ON DELETE CASCADE,
    CONSTRAINT fk_adoption_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);
