package com.example.demo.model;  // Defines the package.

import lombok.AllArgsConstructor;  // Imports AllArgsConstructor to generate constructor with all fields.
import lombok.Data;  // Imports Data annotation to generate getters, setters, toString, equals, and hashCode.

@Data  // Generates getters, setters, toString, equals, and hashCode methods.
@AllArgsConstructor  // Generates constructor with all arguments.
public class Category {

    private String name;  // Name of the performance category.

    private double standardPercentage;  // The standard percentage assigned to the category.
}