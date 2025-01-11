import React, { useState } from 'react';  // Import necessary hooks from React
import EmployeeService from '../services/EmployeeService';  // Import EmployeeService for handling API requests

const EmployeeForm = () => {
  // State to store employee data (id, name, ratingCategory)
  const [employee, setEmployee] = useState({
    id: '',  // Employee ID
    name: '',  // Employee Name
    ratingCategory: '',  // Rating category (A, B, C, D, E)
  });

  // State to store the message (success/error) after form submission
  const [message, setMessage] = useState('');

  // Handle changes in the form inputs and update the employee state
  const handleChange = (e) => {
    const { name, value } = e.target;  // Get the name and value from the input element
    setEmployee({ ...employee, [name]: value });  // Update the corresponding field in the employee state
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Make sure the fields are not empty
    if (!employee.id || !employee.name || !employee.ratingCategory) {
      setMessage('Please fill in all fields.');
      return;
    }

    // Ensure rating is one of the allowed values
    const validRatings = ['A', 'B', 'C', 'D', 'E'];
    if (!validRatings.includes(employee.ratingCategory.toUpperCase())) {
      setMessage('Rating must be one of A, B, C, D, or E.');
      return;
    }

    // Call the backend API to add the employee
    EmployeeService.addEmployee(employee)
      .then((response) => {
        // On success, display a success message or clear the form
        setMessage(`Employee ${employee.name} added successfully!`);
        setEmployee({ id: '', name: '', ratingCategory: '' }); // Clear the form
      })
      .catch((error) => {
        setMessage('Error adding employee. Please try again.');
        console.error('There was an error adding the employee!', error);
      });
  };

  return (
    <div>
      <h2>Add Employee</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>ID: </label>
          <input
            type="text"
            name="id"
            value={employee.id}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Name: </label>
          <input
            type="text"
            name="name"
            value={employee.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Rating (A, B, C, D, E): </label>
          <input
            type="text"
            name="ratingCategory"
            value={employee.ratingCategory}
            onChange={handleChange}
            maxLength="1"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    
      {message && <p>{message}</p>} {/* Display success or error message */}
    </div>
  );
};

export default EmployeeForm;