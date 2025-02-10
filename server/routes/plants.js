const express = require('express');
const router = express.Router();

// Connect to the SQLite database
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('database.db');


// Get plants dynamically so that there is not a long wait
router.get('/', (req, res) => {
  const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
  const limit = parseInt(req.query.limit) || 4; // Default to 10 items per page if not provided
  const offset = (page - 1) * limit;

  db.all('SELECT * FROM Plants LIMIT ? OFFSET ?', [limit, offset], (err, rows) => {
    if (err) {
      console.error('Error querying plants:', err.message);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      db.get('SELECT COUNT(*) AS count FROM Plants', (err, row) => {
        if (err) {
          console.error('Error querying plant count:', err.message);
          res.status(500).json({ error: 'Internal server error' });
        } else {
          const totalCount = row.count;
          const hasMore = page * limit < totalCount;
          res.json({ plants: rows, hasMore });
        }
      });
    }
  });
});

// Route to fetch all plant names and IDs
router.get('/names', (req, res) => {
  db.all('SELECT PlantID, Name FROM Plants', (err, rows) => {
    if (err) {
      console.error('Error querying plant names:', err.message);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(rows);
    }
  });
});

// Fetch a specific plant by ID
router.get('/:plantID', (req, res) => {
  const plantID = req.params.plantID;

  db.get('SELECT * FROM Plants WHERE PlantID = ?', [plantID], (err, row) => {
    if (err) {
      console.error('Error querying plant:', err.message);
      res.status(500).json({ error: 'Internal server error' });
    } else if (!row) {
      res.status(404).json({ error: 'Plant not found' });
    } else {
      res.json(row);
    }
  });
});

router.get('/:plantID/plantcare', (req, res) => {
  const plantID = req.params.plantID;

  db.get('SELECT * FROM PlantCare WHERE PlantID = ?', [plantID], (err, row) => {
    if (err) {
      console.error('Error querying plant care:', err.message);
      res.status(500).json({ error: 'Internal server error' });
    } else if (!row) {
      res.status(404).json({ error: 'Plant care data not found' });
    } else {
      res.json(row);
    }
  });
});

// GET request for retrieving plant care data
router.get('/plantcare', (req, res) => {
    // Query all plant care data from the PlantCare table
    db.all('SELECT * FROM PlantCare', (err, rows) => {
      if (err) {
        console.error('Error querying plant care data:', err.message);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.json(rows);
      }
    });
  });
  
module.exports = router;
