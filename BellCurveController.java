package com.example.demo.controller;  // Defines the package.

import com.example.demo.model.Category;  // Imports Category model.
import com.example.demo.model.Employee;  // Imports Employee model.
import com.example.demo.repository.EmployeeRepo;  // Imports Employee repository.
import com.example.demo.service.BellCurveService;  // Imports BellCurveService for business logic.
import org.springframework.beans.factory.annotation.Autowired;  // Imports Autowired for dependency injection.
import org.springframework.http.HttpStatus;  // Imports HttpStatus for HTTP response codes.
import org.springframework.http.ResponseEntity;  // Imports ResponseEntity for HTTP response handling.
import org.springframework.web.bind.annotation.*;  // Imports annotations for handling HTTP requests.)

import java.util.*;  // Imports utility classes for collections (List, Map).

@RestController  // Marks this class as a Spring Web REST controller.
@CrossOrigin(origins = "http://localhost:5173")  // Allows cross-origin requests from specified frontend URL.
@RequestMapping("/api/demo")  // Maps all methods in this class to paths starting with /api/demo.
public class BellCurveController {

    @Autowired  // Automatically injects BellCurveService into this controller.
    private BellCurveService service;

    @Autowired  // Automatically injects EmployeeRepo into this controller.
    private EmployeeRepo employeeRepo;

    @GetMapping("/analyze")  // Maps GET requests to /api/demo/analyze.
    public ResponseEntity<Map<String, Object>> analyze() {
        // Define performance categories and their target percentages.
        List<Category> categories = List.of(
                new Category("A", 10.0), // Top performers (10%)
                new Category("B", 20.0), // High performers (20%)
                new Category("C", 40.0), // Average performers (40%)
                new Category("D", 20.0), // Below average performers (20%)
                new Category("E", 10.0)  // Low performers (10%)
        );

        // Fetch all employees from the database.
        List<Employee> employees = employeeRepo.findAll();

        // Calculate the actual performance percentage for each category.
        Map<String, Double> actual = service.calculateActualPercentage(employees, categories);

        // Calculate the deviation of actual percentages from target percentages.
        Map<String, Double> deviation = service.calculateDeviation(actual, categories);

        // Generate suggestions for performance adjustments based on deviations.
        List<Employee> suggestions = service.suggestAdjustments(deviation, employees);

        // Prepare the response as a map containing all the calculated data.
        Map<String, Object> response = new HashMap<>();
        response.put("actualPercentage", actual); // Actual performance percentages
        response.put("deviation", deviation);     // Deviations from target percentages
        response.put("adjustments", suggestions); // Suggested adjustments for employees

        // Return the response as JSON with HTTP status 200 (OK).
        return ResponseEntity.ok(response);
    }

    // Method to add a new employee.
    @PostMapping("/add")  // Maps POST requests to /api/demo/add.
    public ResponseEntity<Employee> addEmployee(@RequestBody Employee employee) {
        Employee savedEmployee = employeeRepo.save(employee);  // Save the employee to the database.
        return ResponseEntity.status(HttpStatus.CREATED).body(savedEmployee);  // Return the saved employee with HTTP status 201 (Created).
    }

    @PostMapping("/add-all")  // Maps POST requests to /api/demo/add-all.
    public ResponseEntity<List<Employee>> addEmployees(@RequestBody List<Employee> employees) {
        List<Employee> savedEmployees = employeeRepo.saveAll(employees);  // Save the list of employees to the database.
        return ResponseEntity.status(HttpStatus.CREATED).body(savedEmployees);  // Return the saved employees with HTTP status 201 (Created).
    }

    // Method to get all employees
    @GetMapping("/employees")  // Maps GET requests to /api/demo/employees.
    public ResponseEntity<List<Employee>> getAllEmployees() {
        List<Employee> employees = employeeRepo.findAll();  // Fetch all employees from the database.
        return ResponseEntity.ok(employees);  // Return the list of employees with HTTP status 200 (OK).
    }
}