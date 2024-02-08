// user.js

const db = require('./db');

const createUserTable = () => {
  const createUserTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      age INT,
      dob DATE,
      contact VARCHAR(20),
      address VARCHAR(255)
    )
  `;
  db.query(createUserTableQuery, (err) => {
    if (err) {
      console.error('Error creating users table:', err);
    } else {
      console.log('Users table created or already exists');
    }
  });
};

const initDatabase = () => {
  createUserTable();
  // Add more table initialization if needed
};

initDatabase();