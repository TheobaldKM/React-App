const express = require('express');
const router = express.Router();
const multer = require('multer');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('database.db');
const authenticateUser = require('../../middleware/authentication'); 

// Multer configuration for handling multipart/form-data (file uploads)
const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });

// Route to add a new plant entry to UserPlants table
router.post('/', authenticateUser, upload.single('PlantPhoto'), (req, res) => {
  const { PlantName, Nickname, Date, Suburb } = req.body;
  const UserID = req.userId;

  // Query the maximum UserPlantsID for the specific user
  db.get(
    'SELECT MAX(UserPlantsID) AS maxUserPlantsID FROM UserPlants WHERE UserID = ?',
    [UserID],
    (err, row) => {
      if (err) {
        console.error('Error querying maximum UserPlantsID:', err.message);
        return res.status(500).json({ error: 'Internal server error' });
      }

    // Ensure that a file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
  }

    // Access the uploaded file using req.file.buffer
    const plantPhoto = req.file.buffer;

      // Increment the maximum UserPlantsID by one to generate the new UserPlantsID
      const UserPlantsID = (row.maxUserPlantsID || 0) + 1;

      // Insert the new plant entry into the UserPlants table
      db.run(
        'INSERT INTO UserPlants (UserPlantsID, UserID, PlantID, Nickname, Date, Suburb, PlantPhoto) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [UserPlantsID, UserID, PlantName, Nickname, Date, Suburb, plantPhoto],
        function(err) {
          if (err) {
            console.error('Error adding plant:', err.message);
            return res.status(500).json({ error: 'Internal server error' });
          }
          console.log('Plant added successfully');
          res.status(201).json({ message: 'Plant added successfully', insertedUserPlantID: UserPlantsID });
        }
      );
      db.run(
        'INSERT INTO SuburbStats (SuburbCode, PlantCount) VALUES ((SELECT SuburbCode FROM Suburb WHERE SuburbName = ?), 1) ON CONFLICT(SuburbCode) DO UPDATE SET PlantCount = PlantCount + 1',
        [Suburb],
        function(err) {
            if (err) {
                console.error('Error updating suburb statistics:', err.message);
            }
        }
    );
    }
  );

});

// Route to retrieve all user plants
router.get('/', authenticateUser, (req, res) => {

  const UserID = req.userId;
  // Query all user plants for the specific user
  db.all(
    'SELECT * FROM UserPlants WHERE UserID = ?',
    [UserID],
    (err, rows) => {
      if (err) {
        console.log('error')
        console.error('Error querying user plants:', err.message);
        return res.status(500).json({ error: 'Internal server error' });
      }
      // Send the retrieved user plants as a response
      res.status(200).json(rows);
    }
  );
});

module.exports = router;