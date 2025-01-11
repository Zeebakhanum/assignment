import React, { useState, useEffect } from 'react';
import { getAnalysis, getAllEmployees, addEmployee, addEmployees } from './api';
import './App.css';
import EmployeeForm from './components/EmployeeForm';
import AnalyzeTable from './components/AnalyzeTable';

const App = () => {
  const [analysisData, setAnalysisData] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({ name: '', rating: '', category: '' });
  const [batchEmployees, setBatchEmployees] = useState([{ name: '', rating: '', category: '' }]);
  // Fetch employee data and analysis data

  return (
    <div>
      <h1>Employee Performance Dashboard</h1>

      <AnalyzeTable/>

      <EmployeeForm/>
    </div>
    
  );
};

export default App;
