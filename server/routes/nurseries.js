const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();

// Connect to SQLite database
const db = new sqlite3.Database('database.db');

// Route to retrieve all Nurseries from the database
router.get('/', (req, res) => {
    // Query all
    db.all('SELECT * FROM Nurseries', (err, rows) => {
        if (err) {
            console.error('Error querying suburbs:', err.message);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.json(rows); // Send the nursery data as JSON response
        }
    });
});



module.exports = router;