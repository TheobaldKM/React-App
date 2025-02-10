const express = require('express');
const router = express.Router();
const multer = require('multer');
const sqlite3 = require('sqlite3');
const authenticateUser = require('../../middleware/authentication');
const db = new sqlite3.Database('database.db');

// Multer configuration for handling multipart/form-data (file uploads)
const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });

// Route to add a new plant update entry to PlantUpdate table
router.post('/', upload.single('PlantPhoto'), (req, res) => {
  const { UserPlantsID, UserID, PlantID, UpdateType, Comment, Date, Suburb, Username, PlantSpecies } = req.body;

  // Ensure that a file was uploaded
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Access the uploaded file using req.file.buffer
  const PlantPhoto = req.file.buffer;

  // Convert the IsPublic to a boolean
  const Public = req.body.IsPublic === 'true';


  // Insert the new plant update entry into the PlantUpdate table
  db.run(
    'INSERT INTO PlantUpdates (UserPlantsID, UserID, PlantID, UpdateType, Comment, Date, Suburb, UserName, Public, PlantSpecies, Image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [UserPlantsID, UserID, PlantID, UpdateType, Comment, Date, Suburb, Username, Public, PlantSpecies, PlantPhoto],
    function(err) {
      if (err) {
        console.error('Error adding plant update:', err.message);
        return res.status(500).json({ error: 'Internal server error' });
      }
      console.log('Plant update added successfully');
      res.status(201).json({ message: 'Plant update added successfully' });
    }
  );
});

// Route to retrieve all plant updates for a specific user
router.get('/', (req, res) => {
  const { userPlantsID, userID } = req.query;
  // Query recent plant updates for the specific user and user's plants
  db.all(
    'SELECT * FROM PlantUpdates WHERE UserPlantsID = ? AND UserID = ? ORDER BY Date DESC',
    [userPlantsID, userID],
    (err, rows) => {
      if (err) {
        console.error('Error querying plant updates:', err.message);
        return res.status(500).json({ error: 'Internal server error' });
      }
      // Send the retrieved plant updates as a response
      res.status(200).json(rows);
    }
  );
});

// Route to retrieve all plant updates labelled as public
router.get('/public', (req, res) => {
  db.all(
    'SELECT * FROM PlantUpdates WHERE Public = 1 ORDER BY Date DESC',
    (err, rows) => {
      if (err) {
        console.error('Error querying plant updates:', err.message);
        return res.status(500).json({ error: 'Internal server error' });
      }
      // Send the retrieved plant updates as a response
      res.status(200).json(rows)
    }
  );
});

module.exports = router;
