package com.petadoption;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class PetAdoptionApplication {

    public static void main(String[] args) {
        SpringApplication.run(PetAdoptionApplication.class, args);
        System.out.println("==================================================================");
        System.out.println(" 🐾 Pet Adoption Management System is running!");
        System.out.println(" Web UI:       http://localhost:8080");
        System.out.println(" H2 Console:   http://localhost:8080/h2-console (JDBC: jdbc:h2:mem:petadoptdb)");
        System.out.println(" REST API:     http://localhost:8080/api/pets");
        System.out.println("==================================================================");
    }
}
