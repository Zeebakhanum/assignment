package com.example.demo.repository;      // Defines the package.

import com.example.demo.model.Employee;      // Imports the Employee model.
import org.springframework.data.jpa.repository.JpaRepository;      // Imports JpaRepository for data operations.
import org.springframework.stereotype.Repository;      // Imports Repository annotation.

@Repository      // Marks this interface as a Spring Data repository.
public interface EmployeeRepo extends JpaRepository<Employee, Long> {      // Extends JpaRepository to provide CRUD operations for Employee entity.
}