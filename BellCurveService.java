package com.example.demo.service;

import com.example.demo.model.Category;  // Imports Category model.
import com.example.demo.model.Employee;  // Imports Employee model.
import org.springframework.stereotype.Service;  // Imports Service annotation.
import java.util.ArrayList;  // Imports ArrayList class.
import java.util.HashMap;  // Imports HashMap class.
import java.util.List;  // Imports List interface.
import java.util.Map;  // Imports Map interface.
import java.util.stream.Collectors;  // Imports Collectors class for stream operations.

@Service  // Marks this class as a service bean in Spring.
public class BellCurveService {

    /**
     * Calculate the actual percentage distribution of employees across categories.
     */
    public Map<String, Double> calculateActualPercentage(List<Employee> employees, List<Category> categories) {
        // Group employees by rating category and count occurrences.
        Map<String, Long> countByCategory = employees.stream()
                .collect(Collectors.groupingBy(Employee::getRatingCategory, Collectors.counting()));

        int totalEmployees = employees.size();     // Total number of employees.


        Map<String, Double> actualPercentage = new HashMap<>();       // Map to store actual percentage distribution.

        // Calculate actual percentage for each category.
        for (Category category : categories) {
            long count = countByCategory.getOrDefault(category.getName(), 0L);        // Get count or default to 0.
            double percentage = (double) count / totalEmployees * 100;        // Calculate percentage.
            actualPercentage.put(category.getName(), percentage);            // Store in map.
        }

        return actualPercentage;
    }

    /**
     * Calculate the deviation of actual percentages from standard percentages.
     */
    public Map<String, Double> calculateDeviation(Map<String, Double> actual, List<Category> categories) {
        // Map to store deviation values.
        Map<String, Double> deviation = new HashMap<>();

        // Calculate deviation for each category.
        for (Category category : categories) {
            double standard = category.getStandardPercentage();          // Standard percentage.
            double actualPercentage = actual.getOrDefault(category.getName(), 0.0);        // Actual percentage.
            deviation.put(category.getName(), actualPercentage - standard);            // Store deviation.
        }

        return deviation;
    }

    /**
     * Suggest adjustments for employees in overrepresented categories.
     */
    public List<Employee> suggestAdjustments(Map<String, Double> deviation, List<Employee> employees) {
        // List to store employees needing adjustment.
        List<Employee> adjustments = new ArrayList<>();

        // Identify overrepresented categories and suggest adjustments.
        for (Map.Entry<String, Double> entry : deviation.entrySet()) {
            if (entry.getValue() > 0) {                   // If the category is overrepresented.
                String category = entry.getKey();        // Category name.
                adjustments.addAll(employees.stream()
                        .filter(emp -> emp.getRatingCategory().equals(category))         // Filter employees in this category.
                        .limit((long) Math.ceil(entry.getValue()))              // Limit adjustments to deviation count.
                        .collect(Collectors.toList()));                        // Collect adjusted employees.
            }
        }

        return adjustments;
    }
}