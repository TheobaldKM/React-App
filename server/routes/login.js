const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3');
const config = require('../config');

const db = new sqlite3.Database('database.db');

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Fetch user from the database
  db.get('SELECT * FROM Users WHERE Email = ?', [email], async (err, user) => {
    if (err) {
      console.error('Error querying database:', err.message);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (!user) {
      
      return res.status(401).json({ error: 'Invalid email' });
    }

    // Validate password
    if (password !== user.PasswordHash) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // If email and password are correct, generate JWT token
    const token = jwt.sign({ userId: user.UserID }, config.secretKey, { expiresIn: '6h' });
    res.json({ token, userId: user.UserID }); // Include userId in the response
  });
});

module.exports = router;
