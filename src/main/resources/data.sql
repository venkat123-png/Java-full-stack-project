-- Seed Initial Users (Passwords stored for testing: admin123, user123)
MERGE INTO users (id, full_name, email, password, phone, role, created_at) KEY (email) VALUES
(1, 'Admin Officer', 'admin@petadopt.org', 'admin123', '+1-555-0100', 'ADMIN', CURRENT_TIMESTAMP),
(2, 'Sarah Connor', 'sarah@example.com', 'user123', '+1-555-0199', 'USER', CURRENT_TIMESTAMP),
(3, 'David Miller', 'david@example.com', 'user123', '+1-555-0245', 'USER', CURRENT_TIMESTAMP);

-- Seed Initial Pets
MERGE INTO pets (id, name, species, breed, age_months, gender, health_status, description, image_url, location, status, created_at) KEY (id) VALUES
(1, 'Bella', 'Dog', 'Golden Retriever', 24, 'Female', 'Vaccinated & Spayed', 'Gentle, friendly, and loves playing with children and swimming.', 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=600&q=80', 'Downtown Shelter', 'AVAILABLE', CURRENT_TIMESTAMP),
(2, 'Milo', 'Cat', 'Tabby / Domestic Shorthair', 12, 'Male', 'Fully Vaccinated', 'Playful and curious kitty who loves chasing laser pointers and napping on sunlit rugs.', 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80', 'Westside Rescue', 'AVAILABLE', CURRENT_TIMESTAMP),
(3, 'Rocky', 'Dog', 'German Shepherd', 36, 'Male', 'Neutered & Healthy', 'Loyal, intelligent protector with basic obedience training. Best with active families.', 'https://images.unsplash.com/photo-1589941013453-ec89f33b5455?auto=format&fit=crop&w=600&q=80', 'North Animal Care', 'AVAILABLE', CURRENT_TIMESTAMP),
(4, 'Luna', 'Cat', 'Siamese', 18, 'Female', 'Spayed, Microchipped', 'Quiet, affectionate, and purrs constantly. Enjoys gentle petting and calm indoor homes.', 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=600&q=80', 'Downtown Shelter', 'AVAILABLE', CURRENT_TIMESTAMP),
(5, 'Snowball', 'Rabbit', 'Holland Lop', 8, 'Male', 'Vet Checked & Vaccinated', 'Sweet, fluffy bunny that loves carrots, leafy greens, and gentle head scratches.', 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=600&q=80', 'East Animal Sanctuary', 'AVAILABLE', CURRENT_TIMESTAMP),
(6, 'Daisy', 'Dog', 'Beagle', 15, 'Female', 'Vaccinated', 'Energetic scent hound who loves outdoor adventures and makes friends instantly.', 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=600&q=80', 'Downtown Shelter', 'AVAILABLE', CURRENT_TIMESTAMP),
(7, 'Charlie', 'Dog', 'Labrador Retriever', 40, 'Male', 'Fully Vaccinated & Neutered', 'Adopted by the Johnson family! Now living happily with two kids and a spacious backyard.', 'https://images.unsplash.com/photo-1591769225440-811ad7d6eab2?auto=format&fit=crop&w=600&q=80', 'Westside Rescue', 'ADOPTED', CURRENT_TIMESTAMP),
(8, 'Cleo', 'Cat', 'Calico', 28, 'Female', 'Spayed & Dewormed', 'Found her forever home with loving senior adopters. Loves lap cuddles.', 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=600&q=80', 'North Animal Care', 'ADOPTED', CURRENT_TIMESTAMP);

-- Seed Initial Adoption Requests
MERGE INTO adoption_requests (id, pet_id, user_id, adopter_name, adopter_email, adopter_phone, home_type, has_other_pets, reason, status, request_date, admin_notes) KEY (id) VALUES
(1, 1, 2, 'Sarah Connor', 'sarah@example.com', '+1-555-0199', 'House with Fenced Yard', TRUE, 'We have a friendly dog already and want a sibling for her to play with.', 'PENDING', CURRENT_TIMESTAMP, 'Reviewing home environment and yard fencing.'),
(2, 7, 3, 'David Miller', 'david@example.com', '+1-555-0245', 'Suburban Home', FALSE, 'Looking for an energetic companion for walking and hiking.', 'APPROVED', CURRENT_TIMESTAMP, 'Home inspection passed, adoption finalized successfully.');
