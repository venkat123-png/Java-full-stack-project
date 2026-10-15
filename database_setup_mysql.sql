-- ==========================================================
-- Pet Adoption Management System - Complete MySQL Database Setup
-- Run this in MySQL Workbench, phpMyAdmin, or MySQL CLI:
-- mysql -u root -p < database_setup_mysql.sql
-- ==========================================================

DROP DATABASE IF EXISTS pet_adoption_db;
CREATE DATABASE pet_adoption_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE pet_adoption_db;

-- 1. Users Table
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    role ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 2. Pets Table
CREATE TABLE pets (
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
    status ENUM('AVAILABLE', 'PENDING', 'ADOPTED') NOT NULL DEFAULT 'AVAILABLE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 3. Adoption Requests Table
CREATE TABLE adoption_requests (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    pet_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    adopter_name VARCHAR(100) NOT NULL,
    adopter_email VARCHAR(100) NOT NULL,
    adopter_phone VARCHAR(20) NOT NULL,
    home_type VARCHAR(100),
    has_other_pets BOOLEAN DEFAULT FALSE,
    reason TEXT,
    status ENUM('PENDING', 'APPROVED', 'REJECTED') NOT NULL DEFAULT 'PENDING',
    request_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    admin_notes TEXT,
    CONSTRAINT fk_req_pet FOREIGN KEY (pet_id) REFERENCES pets (id) ON DELETE CASCADE,
    CONSTRAINT fk_req_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ==========================================================
-- SEED INITIAL DATA
-- ==========================================================

-- Admin and Adopter Accounts
INSERT INTO users (id, full_name, email, password, phone, role) VALUES
(1, 'Admin Officer', 'admin@petadopt.org', 'admin123', '+1-555-0100', 'ADMIN'),
(2, 'Sarah Connor', 'sarah@example.com', 'user123', '+1-555-0199', 'USER'),
(3, 'David Miller', 'david@example.com', 'user123', '+1-555-0245', 'USER');

-- Pets
INSERT INTO pets (id, name, species, breed, age_months, gender, health_status, description, image_url, location, status) VALUES
(1, 'Bella', 'Dog', 'Golden Retriever', 24, 'Female', 'Vaccinated & Spayed', 'Gentle, friendly, and loves playing with children and swimming.', 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=600&q=80', 'Downtown Shelter', 'AVAILABLE'),
(2, 'Milo', 'Cat', 'Tabby / Domestic Shorthair', 12, 'Male', 'Fully Vaccinated', 'Playful and curious kitty who loves chasing laser pointers and napping on sunlit rugs.', 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80', 'Westside Rescue', 'AVAILABLE'),
(3, 'Rocky', 'Dog', 'German Shepherd', 36, 'Male', 'Neutered & Healthy', 'Loyal, intelligent protector with basic obedience training. Best with active families.', 'https://images.unsplash.com/photo-1589941013453-ec89f33b5455?auto=format&fit=crop&w=600&q=80', 'North Animal Care', 'AVAILABLE'),
(4, 'Luna', 'Cat', 'Siamese', 18, 'Female', 'Spayed, Microchipped', 'Quiet, affectionate, and purrs constantly. Enjoys gentle petting and calm indoor homes.', 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=600&q=80', 'Downtown Shelter', 'AVAILABLE'),
(5, 'Snowball', 'Rabbit', 'Holland Lop', 8, 'Male', 'Vet Checked & Vaccinated', 'Sweet, fluffy bunny that loves carrots, leafy greens, and gentle head scratches.', 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=600&q=80', 'East Animal Sanctuary', 'AVAILABLE'),
(6, 'Daisy', 'Dog', 'Beagle', 15, 'Female', 'Vaccinated', 'Energetic scent hound who loves outdoor adventures and makes friends instantly.', 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=600&q=80', 'Downtown Shelter', 'AVAILABLE'),
(7, 'Charlie', 'Dog', 'Labrador Retriever', 40, 'Male', 'Fully Vaccinated & Neutered', 'Adopted by the Johnson family! Now living happily with two kids and a spacious backyard.', 'https://images.unsplash.com/photo-1591769225440-811ad7d6eab2?auto=format&fit=crop&w=600&q=80', 'Westside Rescue', 'ADOPTED'),
(8, 'Cleo', 'Cat', 'Calico', 28, 'Female', 'Spayed & Dewormed', 'Found her forever home with loving senior adopters. Loves lap cuddles.', 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=600&q=80', 'North Animal Care', 'ADOPTED');

-- Adoption Applications
INSERT INTO adoption_requests (id, pet_id, user_id, adopter_name, adopter_email, adopter_phone, home_type, has_other_pets, reason, status, admin_notes) VALUES
(1, 1, 2, 'Sarah Connor', 'sarah@example.com', '+1-555-0199', 'House with Fenced Yard', TRUE, 'We have a friendly dog already and want a sibling for her to play with.', 'PENDING', 'Reviewing home environment and yard fencing.'),
(2, 7, 3, 'David Miller', 'david@example.com', '+1-555-0245', 'Suburban Home', FALSE, 'Looking for an energetic companion for walking and hiking.', 'APPROVED', 'Home inspection passed, adoption finalized successfully.');
