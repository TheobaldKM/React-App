const fs = require('fs');
const path = require('path');
const { db } = require('../database');

// Function to check if database is populated
function isDatabasePopulated() {
  return new Promise((resolve, reject) => {
    db.get("SELECT COUNT(*) AS count FROM Plants", (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row.count > 0);
      }
    });
  });
}

// List of populate database files
const populateFiles = [
    'populate-nurseries.js',
    'populate-badges.js',
    'populate-plantcare.js',
    'populate-plants.js',
    'populate-suburbs.js'
];

// Function to run each populate file
const runPopulateFile = (filename) => {
    console.log(`Running ${filename}...`);
    require(path.join(__dirname, filename));
};

// Function to run all populate files

  function populateDatabase() {
    return new Promise((resolve, reject) => {
    try {
      isDatabasePopulated()
        .then((populated) => {
          if (!populated) {
            populateFiles.forEach((filename) => {
              runPopulateFile(filename);
            });
          } else {
            console.log('Database is already populated.');
          }
        })
        .catch((error) => {
          console.error('Error checking database population:', error);
        });
    } catch (error) {
      console.error('Error checking database population:', error);
    }
        console.log("Database population started...");
        setTimeout(() => {
            console.log("Database populated.");
            resolve();
        }, 40000); // Simulating some asynchronous process
    });
}

// Export the function to populate the database
module.exports = populateDatabase;