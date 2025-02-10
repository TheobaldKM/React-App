const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');
console.log('populate-badges.js is running...');

// Define the path to the database file
const dbPath = 'database.db';

// Create a new SQLite database connection
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Database connected successfully. Slay');
    }
});

const badgeData = [
    {
        Name: 'Green Thumb',
        Description: 'Well done! You\'ve added 5 plants!',
        Icon: 'fa-solid fa-seedling'
    }
]

// Insert badge data into the database
db.serialize(() => {
    // Prepare SQL statement
    const stmt = db.prepare(
        'INSERT OR IGNORE INTO Badges (Name, Description, Icon) VALUES (?,?,?)'
    );


    // Insert each badge data into the table
    badgeData.forEach(badge => {
        stmt.run(
            badge.Name,
            badge.Description,
            badge.Icon
        );
    });

    // Finalize the statement
    stmt.finalize((err) => {
        if (err) {
            console.error('Error finalizing statement:', err.message);
        } else {
            console.log('Statement finalized.');
        }
    });
});


// Close the database connection
db.close((err) => {
    if (err) {
        console.error('Error closing the database:', err.message);
    } else {
        console.log('Database connection closed.');
    }
});
