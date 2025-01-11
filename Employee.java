package com.example.demo.model;  // Defines the package.

import jakarta.persistence.Entity;  // Imports Entity annotation for JPA entities.
import jakarta.persistence.Id;  // Imports id annotation to define primary key.
import lombok.AllArgsConstructor;  // Imports AllArgsConstructor for generating constructor with all fields.
import lombok.Data;  // Imports Data annotation to automatically generate getters, setters, toString, equals, and hashCode.
import lombok.NoArgsConstructor;  // Imports NoArgsConstructor for generating no-argument constructor.

@Data  // Generates getters, setters, toString, equals, and hashCode methods.
@NoArgsConstructor  // Generates no-argument constructor.
@AllArgsConstructor  // Generates constructor with all arguments.
@Entity  // Marks this class as a JPA entity, meaning it maps to a table in the database.
public class Employee {

    @Id  // Marks the id field as the primary key.
    private Long id;  // Employee's unique identifier.

    private String name;  // Employee's name.

    private String ratingCategory;  // Employee's rating category.
}