
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import EmployeeList from './components/EmployeeList';
import { Link } from 'react-router-dom';
import './App.css';
import AddEmployee from './components/AddEmployee'; 

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/login">Login</Link>
          <Link to="/employee-list">Employee List</Link>
          <Link to="/signup">Signup</Link>
        </nav>

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/employee-list" element={<EmployeeList />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/add-employee" element={AddEmployee} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

