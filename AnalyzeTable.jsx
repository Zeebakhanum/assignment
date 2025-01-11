import React, { useEffect, useState } from 'react';  // Import necessary hooks and libraries
import axios from 'axios';  // Import axios for making HTTP requests

const PerformanceAnalysis = () => {
  // State to store the fetched data, loading state, and error message
  const [data, setData] = useState({
    actualPercentage: {},  // Stores the actual performance percentages for each category
    deviation: {},         // Stores the deviation from the target percentages
    adjustments: [],       // Stores employees who need adjustments
  });
  const [loading, setLoading] = useState(true);  // State to track loading status
  const [error, setError] = useState(null);  // State to track any errors during data fetching

  // Fetch data from the server when the component mounts
  useEffect(() => {
    axios
      .get('http://localhost:8080/api/demo/analyze')  // Adjust the URL based on your API
      .then((response) => {
        setData(response.data);  // Set the data received from the server
        setLoading(false);  // Set loading state to false after data is received
      })
      .catch((err) => {
        setError(err.message);  // Set the error message if the request fails
        setLoading(false);  // Set loading state to false if an error occurs
      });
  }, []);  // Empty dependency array means this effect runs once when the component mounts

  // Render loading message if data is still being fetched
  if (loading) return <div>Loading...</div>;

  // Render error message if there was an error fetching data
  if (error) return <div>Error: {error}</div>;

  // Destructure the data object into actualPercentage, deviation, and adjustments
  const { actualPercentage, deviation, adjustments } = data;

  // Helper function to format percentages with 2 decimal places
  const formatPercentage = (value) => {
    if (typeof value === 'number' && !isNaN(value)) {
      return value.toFixed(2);  // Format as percentage with 2 decimal places
    } else {
      return 'N/A';  // Return 'N/A' if the value is invalid
    }
  };

  return (
    <div>
      <h1>Performance Analysis</h1>

      {/* Display the actual percentage table */}
      <h2>Actual Percentage</h2>
      <table border="1" style={{ width: '100%', textAlign: 'left' }}>
        <thead>
          <tr>
            <th>Category</th>
            <th>Percentage</th>
          </tr>
        </thead>
        <tbody>
          {/* Iterate over actualPercentage object and display each category's percentage */}
          {Object.entries(actualPercentage).map(([key, value]) => (
            <tr key={key}>
              <td>{key}</td>
              <td>{formatPercentage(value)}%</td> {/* Format and display the percentage */}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Display the deviation table */}
      <h2>Deviation</h2>
      <table border="1" style={{ width: '100%', textAlign: 'left' }}>
        <thead>
          <tr>
            <th>Category</th>
            <th>Deviation</th>
          </tr>
        </thead>
        <tbody>
          {/* Iterate over deviation object and display each category's deviation */}
          {Object.entries(deviation).map(([key, value]) => (
            <tr key={key}>
              <td>{key}</td>
              <td>{formatPercentage(value)}%</td> {/* Format and display the deviation */}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Display the adjustment suggestions table */}
      <h2>Adjustments</h2>
      <table border="1" style={{ width: '100%', textAlign: 'left' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Rating Category</th>
          </tr>
        </thead>
        <tbody>
          {/* Iterate over adjustments array and display employee details */}
          {adjustments.map(({ id, name, ratingCategory }) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{name}</td>
              <td>{ratingCategory}</td>  {/* Display the employee's rating category */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PerformanceAnalysis;  // Export the component for use in other parts of the app