const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3');
const registerRoutes = require('./routes/register');
const loginRoutes = require('./routes/login');
const suburbRoutes = require('./routes/suburbs');
const nurseryRoutes = require('./routes/nurseries');
const badgeRoutes = require('./routes/badges');
const plantsRoutes = require('./routes/plants');
const userPlantsRoutes = require('./routes/userPlants');
const plantUpdateRoutes = require('./routes/updatePlant');
const authenticateUser = require('../middleware/authentication');
const {createDatabase} = require('./database');
const populateDatabase = require('./PopulateDatabaseFiles/populateAll');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

createDatabase()
    .then(() => {
        // After createDatabase() is finished, call populateDatabase()
        return populateDatabase();
    })
    .then(() => {
        console.log("All tasks completed successfully.");
    })
    .catch((error) => {
        console.error("An error occurred:", error);
    });

// Connect to SQLite database
const db = new sqlite3.Database('database.db', (err) => {
  if (err) {
    console.error('Error opening database connection:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../npp-app/build')));

// Base route
app.get('/', (req, res) => {
  res.send('This page will eventually have API Documentation');
});

// Register routes
app.use('/api', registerRoutes(db));

// Login routes
app.use('/api', loginRoutes);

// Suburb routes
app.use('/api/suburbs', suburbRoutes);

// Nursery routes
app.use('/api/nurseries', nurseryRoutes);

// Badge routes
app.use('/api/badges', badgeRoutes);

// User plants route
app.use('/api/userPlants', authenticateUser, userPlantsRoutes);

// Plants route
app.use('/api/plants', plantsRoutes);

// Update plants route
app.use('/api/plantUpdate', plantUpdateRoutes);

// Catch-all to return the React app for any other route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../npp-app/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
