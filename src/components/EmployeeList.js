
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    
    fetch('http://localhost:8089/api/v1/emp/employees')
  .then(response => {
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => console.error('Error fetching employees:', error));

  }, []); 

  return (
    <div>
      <h2>Employee List</h2>
      <ul>
        {employees.map(employee => (
          <li key={employee._id}>
            {employee.first_name} {employee.last_name} - {employee.email}
          </li>
        ))}
      </ul>
      <Link to="/add-employee">
        <button>Add Employee</button>
      </Link>
    </div>
  );
};

export default EmployeeList;
