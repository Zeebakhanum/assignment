import axios from 'axios';  // Import axios library for making HTTP requests

const API_BASE_URL = 'http://localhost:8080/api/demo';  // Define the base URL for the backend API

// Function to fetch the analysis data from the backend
export const getAnalysis = async () => {
  try {
    // Send a GET request to fetch the analysis data
    const response = await axios.get(`${API_BASE_URL}/analyze`);
    return response.data;  // Return the response data from the backend
  } catch (error) {
    // Log any error that occurs during the GET request
    console.error('Error fetching analysis data:', error);
    throw error;  // Throw the error to be handled in the calling function
  }
};

// Function to fetch all employees from the backend
export const getAllEmployees = async () => {
  try {
    // Send a GET request to fetch all employees
    const response = await axios.get(`${API_BASE_URL}/employees`);
    return response.data;  // Return the response data (list of employees)
  } catch (error) {
    // Log any error that occurs during the GET request
    console.error('Error fetching employees:', error);
    throw error;  // Throw the error to be handled in the calling function
  }
};

// Function to add a single employee to the backend
export const addEmployee = async (employee) => {
  try {
    // Send a POST request to add a new employee
    const response = await axios.post(`${API_BASE_URL}/add`, employee);
    return response.data;  // Return the saved employee data from the backend
  } catch (error) {
    // Log any error that occurs during the POST request
    console.error('Error adding employee:', error);
    throw error;  // Throw the error to be handled in the calling function
  }
};

// Function to add multiple employees at once
export const addEmployees = async (employees) => {
  try {
    // Send a POST request to add multiple employees
    const response = await axios.post(`${API_BASE_URL}/add-all`, employees);
    return response.data;  // Return the list of added employees from the backend
  } catch (error) {
    // Log any error that occurs during the POST request
    console.error('Error adding employees:', error);
    throw error;  // Throw the error to be handled in the calling function
  }
};
