# 🐾 Pet Adoption Management System (Java Full Stack & Spring Boot)

> **"Find a Friend • Give a Home • Make a Difference"**

A comprehensive, production-ready Java Full Stack web application designed to connect abandoned or rescued pets with potential adopters. It digitizes the end-to-end pet adoption lifecycle, from animal intake and public browsing to adoption application submission and administrative reviews.

---

## 🛠️ Technology Stack

| Layer | Technologies Used |
|---|---|
| **Backend** | Java 17+, **Spring Boot 3.2.x**, Spring Web (REST API), Spring Data JPA, Hibernate, Bean Validation |
| **Database** | **MySQL** (production-ready) / **H2** (in-memory zero-config for instant testing) |
| **Frontend** | **HTML5**, **CSS3**, **JavaScript (Fetch API)**, **Bootstrap 5.3**, Bootstrap Icons |
| **Build Tool** | Apache Maven |

---

## 📋 System Features & 9-Step Workflow

As outlined in the system architecture:

```
[1. User Registration] ──> [2. Login] ──> [3. Browse Pets] ──> [4. Apply for Adoption]
                                                                        │
[9. Logout] <── [8. View Adopted Pets] <── [7. Manage Pets] <── [6. Confirm] <── [5. Admin Review]
```

1. **User Registration**: New adopters create an account with email, contact information, and role.
2. **User Login**: Secure authentication with role-based redirection to user dashboard or admin hub.
3. **Browse Pets**: View available pets with pictures, species, breed, age, gender, health status, and location. Real-time filtering by species and keyword.
4. **Apply for Adoption**: Adopters submit application forms specifying home type, living conditions, and reason for adoption.
5. **Review Request (Admin)**: Shelter administrators review incoming applications and approve or reject them with feedback.
6. **Adoption Confirmation**: Upon approval, the pet's status automatically transitions to `ADOPTED`.
7. **Manage Pet Records (Admin)**: Admins can add, edit, or delete pet listings and update medical/health statuses.
8. **View Adopted Pets**: Public gallery celebrating success stories and forever homes.
9. **Secure Logout**: Clears authentication state and returns to public view.

---

## 🚀 Quick Start Guide

### Prerequisites
- **Java JDK 17** or higher installed (`java -version`)
- **Maven 3.8+** installed (`mvn -v`) *or* run inside IntelliJ IDEA / Eclipse / VS Code
- *(Optional)* MySQL 8.x (if using MySQL instead of default H2)

### 1. Run with H2 In-Memory Database (Zero-Config, Instant Run)
By default, the application runs with an in-memory H2 database pre-seeded with sample pets, adopters, and admin accounts.

```bash
cd pet-adoption-system
mvn spring-boot:run
```

Once started:
- 🌐 **Web Application UI**: [http://localhost:8080](http://localhost:8080)
- 🗄️ **H2 Database Console**: [http://localhost:8080/h2-console](http://localhost:8080/h2-console)
  - JDBC URL: `jdbc:h2:mem:petadoptdb`
  - Username: `sa`
  - Password: *(leave blank)*

### 2. Run with MySQL Database
1. Create the MySQL database:
```sql
CREATE DATABASE pet_adoption_db;
```
2. Adjust MySQL username and password in `src/main/resources/application-mysql.properties` if needed.
3. Start the application with the `mysql` profile:
```bash
mvn spring-boot:run -Dspring-boot.run.profiles=mysql
```

---

## 🔑 Demo Login Accounts

| Role | Email | Password | Access Rights |
|---|---|---|---|
| **Admin Officer** | `admin@petadopt.org` | `admin123` | Add/Edit/Delete Pets, Review & Approve/Reject Applications |
| **Adopter User** | `sarah@example.com` | `user123` | Browse pets, Apply for adoption, View personal dashboard |

*(Quick 1-click test login buttons are also available on the Login page!)*

---

## 📡 REST API Reference

### Authentication (`/api/auth`)
- `POST /api/auth/register` - Create new user account
- `POST /api/auth/login` - Authenticate user credentials

### Pets (`/api/pets`)
- `GET /api/pets` - Retrieve all pets
- `GET /api/pets/available` - Retrieve all available pets
- `GET /api/pets/adopted` - Retrieve all adopted pets
- `GET /api/pets/{id}` - Retrieve pet details by ID
- `GET /api/pets/search?species=Dog&status=AVAILABLE&keyword=Golden` - Search & filter pets
- `POST /api/pets` - Create new pet record *(Admin)*
- `PUT /api/pets/{id}` - Update pet record *(Admin)*
- `DELETE /api/pets/{id}` - Delete pet record *(Admin)*

### Adoption Requests (`/api/adoptions`)
- `POST /api/adoptions` - Submit adoption application *(User)*
- `GET /api/adoptions` - Retrieve all adoption requests *(Admin)*
- `GET /api/adoptions/my/{userId}` - Retrieve requests submitted by user *(User)*
- `PATCH /api/adoptions/{id}/status` - Approve or reject request *(Admin)*
