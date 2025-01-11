import React, { useEffect, useState } from 'react';          // Import necessary hooks from React
import EmployeeService from '../services/EmployeeService';  // Import EmployeeService to fetch data from the API

const EmployeeList = () => {
  // State to store the list of employees fetched from the server
  const [employees, setEmployees] = useState([]);

  // useEffect hook to fetch employee data when the component mounts
  useEffect(() => {
    // Call the service to fetch all employees
    EmployeeService.getAllEmployees()
      .then(response => {
        setEmployees(response.data);  // Update the state with the fetched employee data
      })
      .catch(error => {
        console.error(error);  // Log any errors that occur during the data fetching
      });
  }, []);  // Empty dependency array means this effect runs only once, when the component

  return (
    <div>
      <h2>Employee List</h2>
      <table>
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Rating</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.name}</td>
              <td>{emp.rating}</td> {/* Displaying rating as a letter */}
              <td>{emp.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;     // Export the component for use in other parts of the app