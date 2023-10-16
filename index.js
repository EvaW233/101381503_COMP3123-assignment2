const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 8089;

const User = require('./models/user');
const Employee = require('./models/employees'); 

mongoose.connect('mongodb://localhost/comp3123_assignment1', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());

// 1. Allow the user to create a new account (POST)
app.post('/api/v1/user/signup', (req, res) => {
  const { username, email, password } = req.body;
  User.create({ username, email, password })
    .then(newUser => {
      res.status(201).json({ status: true, message: 'User registered successfully' });
    })
    .catch(err => {
      res.status(400).json({ status: false, message: 'User registration failed' });
    });
});

// 2. Allow the user to access the system (POST)
app.post('/api/v1/user/login', (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username, password })
    .then(user => {
      if (!user) {
        res.status(401).json({ status: false, message: 'Invalid Username and Password' });
      } else {
        res.status(200).json({ status: true, username: user.username, message: 'User logged in successfully' });
      }
    })
    .catch(err => {
      res.status(500).json({ status: false, message: 'Internal Server Error' });
    });
});


// 3. User can get all employee list (GET)
app.get('/api/v1/emp/employees', (req, res) => {
    // Fetch all employees from the database
    Employee.find({})
      .then(employees => {
        res.status(200).json(employees);
      })
      .catch(err => {
        res.status(500).json({ status: false, message: 'Internal Server Error' });
      });
  });
  

// 4. User can create a new employee (POST)
app.post('/api/v1/emp/employees', (req, res) => {
    // Extract employee data from the request body
    const { first_name, last_name, email, gender, salary } = req.body;
    Employee.create({ first_name, last_name, email, gender, salary })
      .then(newEmployee => {
        res.status(201).json({ status: true, message: 'Employee created successfully' });
      })
      .catch(err => {
        res.status(400).json({ status: false, message: 'Employee creation failed' });
      });
  });
  
  // 5. User can get employee details by employee ID (GET)
  app.get('/api/v1/emp/employees/:eid', (req, res) => {
    const eid = req.params.eid; 
    Employee.findOne({ _id: eid })
      .then(employee => {
        if (!employee) {
          res.status(404).json({ status: false, message: 'Employee not found' });
        } else {
          res.status(200).json(employee);
        }
      })
      .catch(err => {
        res.status(500).json({ status: false, message: 'Internal Server Error' });
      });
  });
  
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  
  // 6. User can update employee details (PUT)
app.put('/api/v1/emp/employees/:eid', (req, res) => {
    const eid = req.params.eid; 
    const { first_name, last_name, email, gender, salary } = req.body;
    Employee.findByIdAndUpdate(eid, { first_name, last_name, email, gender, salary }, { new: true })
      .then(updatedEmployee => {
        if (!updatedEmployee) {
          res.status(404).json({ status: false, message: 'Employee not found' });
        } else {
          res.status(200).json({ status: true, message: 'Employee details updated successfully', updatedEmployee });
        }
      })
      .catch(err => {
        res.status(500).json({ status: false, message: 'Internal Server Error' });
      });
  });
  
  // 7. User can delete employee by employee ID (DELETE)
app.delete('/api/v1/emp/employees/:eid', (req, res) => {
    const eid = req.params.eid;
    Employee.findByIdAndRemove(eid)
      .then(deletedEmployee => {
        if (!deletedEmployee) {
          res.status(404).json({ status: false, message: 'Employee not found' });
        } else {
          res.status(204).send(); 
        }
      })
      .catch(err => {
        res.status(500).json({ status: false, message: 'Internal Server Error' });
      });
  });
  