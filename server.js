const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

// Signup endpoint
app.post('/api/signup', (req, res) => {
  const { username, email, password, age, dob, contact, address } = req.body;
  const createUserQuery = `
    INSERT INTO users (username, email, password, age, dob, contact, address)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(createUserQuery, [username, email, password, age, dob, contact, address], (err, result) => {
    if (err) {
      console.error('Error signing up:', err);
      res.status(500).json({ success: false, message: 'Error signing up' });
    } else {
      console.log('User signed up successfully');
      res.json({ success: true, message: 'User signed up successfully', user: result });
    }
  });
});

// Login endpoint
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const loginUserQuery = `
    SELECT * FROM users
    WHERE email = ? AND password = ?
  `;
  db.query(loginUserQuery, [email, password], (err, results) => {
    if (err) {
      console.error('Error logging in:', err);
      res.status(500).json({ success: false, message: 'Error logging in' });
    } else {
      if (results.length > 0) {
        console.log('Login successful');
        res.json({ success: true, message: 'Login successful', user: results[0] });
      } else {
        console.log('Invalid email or password');
        res.status(401).json({ success: false, message: 'Invalid email or password' });
      }
    }
  });
});

// Profile endpoint
app.get('/api/profile/:userId', (req, res) => {
  const userId = req.params.userId;
  const getUserProfileQuery = `
    SELECT * FROM users
    WHERE id = ?
  `;
  db.query(getUserProfileQuery, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching user profile:', err);
      res.status(500).json({ success: false, message: 'Error fetching user profile' });
    } else {
      if (results.length > 0) {
        console.log('User profile fetched successfully');
        res.json({ success: true, message: 'User profile fetched successfully', user: results[0] });
      } else {
        console.log('User not found');
        res.status(404).json({ success: false, message: 'User not found' });
      }
    }
  });
});


app.put('/api/user/:email', (req, res) => {
  const email = req.params.email;
  const updatedUserData = req.body; // Contains updated user details
  const updateUserQuery = `
    UPDATE users
    SET ? 
    WHERE email = ?
  `;
  db.query(updateUserQuery, [updatedUserData, email], (err, result) => {
    if (err) {
      console.error('Error updating user details:', err);
      res.status(500).json({ success: false, message: 'Error updating user details' });
    } else {
      if (result.affectedRows > 0) {
        console.log('User details updated successfully');
        res.json({ success: true, message: 'User details updated successfully' });
      } else {
        console.log('User not found');
        res.status(404).json({ success: false, message: 'User not found' });
      }
    }
  });
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});