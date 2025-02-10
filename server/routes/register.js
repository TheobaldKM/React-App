const express = require('express');
const router = express.Router();

module.exports = function(db) {
  // Handle POST request to register a new user
  router.post('/users', async (req, res) => {
    const { username, email, password } = req.body;

    try {
      // Check if username or email already exists
      const existingUser = await new Promise((resolve, reject) => {
        db.get('SELECT * FROM Users WHERE Username = ? OR Email = ?', [username, email], (err, row) => {
          if (err) {
            console.error('Error querying database:', err.message);
            reject(err);
          }
          resolve(row);
        });
      });

      if (existingUser) {
        // Username or email already exists, return error
        return res.status(400).json({ error: 'Username or email already exists' });
      }

      // Insert new user into the database
      db.run('INSERT INTO Users (Username, Email, PasswordHash) VALUES (?, ?, ?)', [username, email, password], function(err) {
        if (err) {
          console.error('Error inserting user into database:', err.message);
          return res.status(500).json({ error: 'Error adding user' });
        }

        console.log('New user registered with ID:', this.lastID);
        res.status(201).json({ message: 'User registered successfully', userID: this.lastID });
      });
    } catch (error) {
      console.error('Error registering user:', error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

    // Handle GET request to retrieve all registered users
    router.get('/users', async (req, res) => {
      try {
        // Fetch all registered users from the database
        db.all('SELECT * FROM Users', (err, rows) => {
          if (err) {
            console.error('Error querying database:', err.message);
            return res.status(500).json({ error: 'Internal server error' });
          }
          res.json(rows);
        });
      } catch (error) {
        console.error('Error retrieving users:', error.message);
        res.status(500).json({ error: 'Internal server error' });
      }
    });

  return router;
};
