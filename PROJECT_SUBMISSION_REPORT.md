# 📑 PROJECT REPORT: PET ADOPTION MANAGEMENT SYSTEM

**Project Title**: Pet Adoption Management System  
**Technology Stack**: Java 21, Spring Boot 3.2.x, Spring Data JPA, MySQL 8 / H2, HTML5, CSS3, JavaScript, Bootstrap 5.3  
**Domain**: Full Stack Web Development / Animal Rescue Management  

---

## 1. ABSTRACT
The **Pet Adoption Management System** is a responsive, web-based Java full-stack application engineered to streamline and digitize the pet rescue and adoption process. Abandoned and rescued animals are often isolated in shelters with limited public visibility, while prospective adopters face cumbersome, paper-based adoption workflows. 

This project bridges this gap by delivering a centralized platform that connects shelters with caring individuals. Built on modern enterprise design patterns using Spring Boot, Hibernate/JPA, and an interactive Bootstrap frontend, the system supports animal cataloging, real-time multi-attribute searching, adoption application processing, administrative oversight, and happy story tracking.

---

## 2. PROBLEM STATEMENT & OBJECTIVES

### Problem Statement
Traditional animal shelters often suffer from:
- Manual, paper-heavy documentation prone to errors and loss.
- Poor visibility of adoptable pets resulting in longer shelter stays.
- Lack of status transparency for adopters after submitting adoption requests.
- Disjointed tracking between pet availability status and application approvals.

### Key Objectives
1. Provide a modern, responsive web catalog allowing adopters to filter pets by species, breed, age, and location.
2. Enable prospective adopters to submit structured digital adoption applications.
3. Equip shelter administrators with an intuitive dashboard to add/edit/delete pet listings and review adoption applications.
4. Implement automatic state transition: approving an application automatically marks the pet as `ADOPTED` and transfers them to the success stories gallery.
5. Provide a standalone, zero-friction deployment configuration with H2 and full production compatibility with MySQL.

---

## 3. SYSTEM ARCHITECTURE

The application follows an **N-Tier Layered Architecture**:

```
[ CLIENT TIER ]
   ├── Desktop & Mobile Browsers
   └── HTML5 / CSS3 / JavaScript (Fetch API) / Bootstrap 5.3
          │
          │ HTTP / REST (JSON)
          ▼
[ CONTROLLER TIER (Spring MVC) ]
   ├── AuthController (/api/auth)
   ├── PetController (/api/pets)
   └── AdoptionRequestController (/api/adoptions)
          │
          ▼
[ BUSINESS LOGIC TIER (Spring Services) ]
   ├── UserService
   ├── PetService
   └── AdoptionRequestService (@Transactional)
          │
          ▼
[ DATA ACCESS TIER (Spring Data JPA / Hibernate) ]
   ├── UserRepository
   ├── PetRepository
   └── AdoptionRequestRepository
          │
          ▼
[ DATABASE TIER ]
   ├── MySQL 8.x (Production)
   └── H2 In-Memory (Development / Demo)
```

---

## 4. WORKFLOW & FUNCTIONAL SPECIFICATION

The application adheres to the complete 9-step workflow:

1. **User Registration**: Users register with full name, email, password, and phone number.
2. **User Login**: Users authenticate securely with role identification (`USER` or `ADMIN`).
3. **Browse Pets**: Public and authenticated users view available pets with images, species, breed, age, gender, and health details. Dynamic filtering supports instant search.
4. **Apply for Adoption**: Adopters fill a structured adoption questionnaire detailing their home environment, other pets, and motivation.
5. **Review Request (Admin)**: Shelter administrators review applications in their queue with full adopter and home details.
6. **Adoption Confirmation**: Admin approval triggers an automatic database transaction updating the pet status to `ADOPTED`.
7. **Manage Pet Records (Admin)**: Admins perform CRUD operations on pet listings (adding new intakes, updating medical records, or removing entries).
8. **View Adopted Pets**: The public "Happy Stories" section showcases all successfully adopted pets.
9. **Logout**: User session is cleared securely.

---

## 5. DATABASE DESIGN & ENTITY-RELATIONSHIP (ER)

### Table 1: `users`
| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Unique user identifier |
| `full_name` | VARCHAR(100) | NOT NULL | User's full name |
| `email` | VARCHAR(100) | NOT NULL, UNIQUE | User login email |
| `password` | VARCHAR(255) | NOT NULL | Account password |
| `phone` | VARCHAR(20) | NULL | Contact phone number |
| `role` | VARCHAR(20) | NOT NULL | Enum: `USER`, `ADMIN` |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Account creation time |

### Table 2: `pets`
| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Unique pet identifier |
| `name` | VARCHAR(100) | NOT NULL | Pet's name |
| `species` | VARCHAR(50) | NOT NULL | Animal species (Dog, Cat, Rabbit) |
| `breed` | VARCHAR(100) | NULL | Animal breed |
| `age_months` | INT | NULL | Age in months |
| `gender` | VARCHAR(20) | NULL | Male or Female |
| `health_status` | VARCHAR(100) | NULL | Vaccination/Neutered status |
| `description` | TEXT | NULL | Temperament and background |
| `image_url` | VARCHAR(500) | NULL | Photo URL |
| `location` | VARCHAR(100) | NULL | Shelter name or location |
| `status` | VARCHAR(20) | NOT NULL | Enum: `AVAILABLE`, `PENDING`, `ADOPTED` |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Intake date |

### Table 3: `adoption_requests`
| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Unique application ID |
| `pet_id` | BIGINT | NOT NULL, FK -> `pets(id)` | Referenced pet |
| `user_id` | BIGINT | NOT NULL, FK -> `users(id)` | Applicant user |
| `adopter_name` | VARCHAR(100) | NOT NULL | Applicant name |
| `adopter_email` | VARCHAR(100) | NOT NULL | Applicant email |
| `adopter_phone` | VARCHAR(20) | NOT NULL | Contact phone |
| `home_type` | VARCHAR(100) | NULL | Apartment, House, Farm, etc. |
| `has_other_pets` | BOOLEAN | DEFAULT FALSE | Other pets at home flag |
| `reason` | TEXT | NULL | Statement of intent |
| `status` | VARCHAR(20) | NOT NULL | Enum: `PENDING`, `APPROVED`, `REJECTED` |
| `request_date` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Application timestamp |
| `admin_notes` | TEXT | NULL | Shelter administrator review feedback |

---

## 6. REST API DOCUMENTATION

| Method | Endpoint | Description | Access |
|---|---|---|---|
| `POST` | `/api/auth/register` | Register new user or admin | Public |
| `POST` | `/api/auth/login` | Authenticate user and issue session token | Public |
| `GET` | `/api/pets` | List all pets | Public |
| `GET` | `/api/pets/available` | List pets available for adoption | Public |
| `GET` | `/api/pets/adopted` | List successfully adopted pets | Public |
| `GET` | `/api/pets/{id}` | Get specific pet profile | Public |
| `GET` | `/api/pets/search` | Search pets by species, status, keyword | Public |
| `POST` | `/api/pets` | Create a new pet listing | Admin |
| `PUT` | `/api/pets/{id}` | Update pet details | Admin |
| `DELETE` | `/api/pets/{id}` | Remove pet listing | Admin |
| `POST` | `/api/adoptions` | Submit adoption application | User / Public |
| `GET` | `/api/adoptions` | List all applications | Admin |
| `GET` | `/api/adoptions/my/{userId}` | List applications for specific user | User |
| `PATCH` | `/api/adoptions/{id}/status` | Approve or Reject adoption request | Admin |

---

## 7. VIVA VOCE & TECHNICAL DEFENSE (QUESTIONS & ANSWERS)

**Q1: Why did you choose Spring Boot for the backend?**  
*Answer:* Spring Boot drastically reduces boilerplate configuration through its auto-configuration, starter dependencies, and embedded Tomcat server. It provides enterprise-grade scalability, robust REST API support, and transactional persistence via Spring Data JPA.

**Q2: How does the system handle state transitions when an adoption is approved?**  
*Answer:* The `AdoptionRequestService` executes an `@Transactional` method: when an administrator approves a request (`APPROVED`), the service updates the request record and synchronously updates the associated `Pet` entity status to `ADOPTED`. If rejected, it returns any pending pet back to `AVAILABLE`.

**Q3: How is data stored for demonstration vs production?**  
*Answer:* By default, the application runs on an in-memory **H2 database** with pre-seeded data (`data.sql`), allowing anyone to evaluate the system with zero database setup. For production, the application includes a ready-to-use MySQL profile activated via `--spring.profiles.active=mysql`.

**Q4: How does the frontend communicate with the backend?**  
*Answer:* The frontend uses native asynchronous JavaScript `fetch()` calls communicating over JSON REST endpoints. Spring Boot serves both the static UI and API endpoints on port 8080, with CORS also configured via `WebMvcConfigurer` to support distributed hosting.

---

## 8. CONCLUSION
The Pet Adoption Management System successfully demonstrates a complete end-to-end full-stack web application. It combines robust architectural patterns in Java Spring Boot with an accessible, mobile-responsive user interface, effectively fulfilling all project objectives.
