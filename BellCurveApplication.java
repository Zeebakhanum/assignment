package com.example.demo;    // This is the package declaration, indicating that the class belongs to the 'com.example.demo' package.

import org.springframework.boot.SpringApplication;     // Importing the necessary Spring Boot classes.
import org.springframework.boot.autoconfigure.SpringBootApplication;       // Imports SpringBootApplication annotation.

@SpringBootApplication     // Marks this as a Spring Boot application.
public class BellCurveApplication {
    public static void main(String[] args) {       // Main method to run the application.
        SpringApplication.run(BellCurveApplication.class, args);}        // Launches the Spring Boot application.
}