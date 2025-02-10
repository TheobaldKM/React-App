const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const axios = require('axios');
const slugify = require('slugify');

// Connect to SQLite database
const db = new sqlite3.Database('database.db');

// Route to retrieve all suburbs from the database
router.get('/', (req, res) => {
    // Query all suburb data from the Suburb table
    db.all('SELECT * FROM Suburb', (err, rows) => {
        if (err) {
            console.error('Error querying suburbs:', err.message);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.json(rows); // Send the suburb data as JSON response
        }
    });
});

// Route to retrieve suburb statistics
router.get('/statistics', (req, res) => {
    // Query suburb statistics from the SuburbStats table and join with Suburb table
    const query = `
        SELECT SuburbStats.*, Suburb.SuburbName
        FROM SuburbStats
        LEFT JOIN Suburb ON SuburbStats.SuburbCode = Suburb.SuburbCode
        ORDER BY SuburbStats.PlantCount DESC
    `;
    db.all(query, (err, rows) => {
        if (err) {
            console.error('Error querying suburb statistics:', err.message);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.json(rows); // Send the suburb statistics with SuburbName as JSON response
        }
    });
});


//Route to retrieve a single suburb by slug and include data from SuburbStats table
router.get('/:suburbSlug', (req, res) => {
    const suburbSlug = req.params.suburbSlug;

    const query = `
        SELECT Suburb.*, SuburbStats.PlantCount
        FROM Suburb
        LEFT JOIN SuburbStats ON Suburb.SuburbCode = SuburbStats.SuburbCode
        WHERE LOWER(SUBSTR(REPLACE(Suburb.SuburbName, " ", "-"), 1, 64)) = ?
    `;
    db.get(query, [suburbSlug], (err, row) => {
        if (err) {
            console.error('Error querying suburb:', err.message);
            res.status(500).json({ error: 'Internal server error' });
        } else if (!row) {
            res.status(404).json({ error: 'Suburb not found' });
        } else {
            res.json(row); // Send the combined suburb data including PlantCount as JSON response
        }
    });
});

// Route to retrieve combined data from Suburb and SuburbStats tables
router.get('/all', (req, res) => {
    // Query combined data from the Suburb and SuburbStats tables
    const query = `
    SELECT 
        Suburb.SuburbName AS SuburbName,
        Suburb.SuburbCode AS SuburbCode,
        Suburb.SuburbLatitude AS SuburbLatitude,
        Suburb.SuburbLongitude AS SuburbLongitude,
        SuburbStats.SuburbStatID AS SuburbStatID,
        SuburbStats.PlantCount AS PlantCount
    FROM Suburb
    LEFT JOIN SuburbStats ON Suburb.SuburbCode = SuburbStats.SuburbCode;
    `;
    db.all(query, (err, rows) => {
        if (err) {
            console.error('Error querying combined data:', err.message);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.json(rows); // Send the combined data as JSON response
        }
    });
});

router.get('/all/leaderboard', (req, res) => {
    const query = `
    SELECT 
        Suburb.SuburbName AS SuburbName,
        Suburb.SuburbCode AS SuburbCode,
        Suburb.SuburbLatitude AS SuburbLatitude,
        Suburb.SuburbLongitude AS SuburbLongitude,
        SuburbStats.SuburbStatID AS SuburbStatID,
        SuburbStats.PlantCount AS PlantCount
    FROM Suburb
    LEFT JOIN SuburbStats ON Suburb.SuburbCode = SuburbStats.SuburbCode;
    `;

    db.all(query, (err, rows) => {
        if (err) {
            console.error('Error querying combined data:', err.message);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        // Separate suburbs with valid and null PlantCount
        const validSuburbs = rows.filter(suburb => suburb.PlantCount !== null);
        const nullPlantCountSuburbs = rows.filter(suburb => suburb.PlantCount === null);

        // Sort valid suburbs based on PlantCount in descending order
        const sortedValidSuburbs = validSuburbs.sort((a, b) => b.PlantCount - a.PlantCount);

        // Assign ranking to valid suburbs
        let previousPlantCount = null;
        let ranking = 0;
        const leaderboard = sortedValidSuburbs.map((suburb, index) => {
            if (suburb.PlantCount !== previousPlantCount) {
                ranking++;
            }
            previousPlantCount = suburb.PlantCount;
            return {
                ranking: suburb.PlantCount === 0 ? null : `${ranking}${getRankSuffix(ranking)}`,
                ...suburb // Include all fields from suburb
            };
        });

        // Append null plant count suburbs to the end of the leaderboard
        nullPlantCountSuburbs.forEach(suburb => {
            leaderboard.push({
                ranking: null,
                ...suburb // Include all fields from suburb
            });
        });

        res.json(leaderboard);
    });
});

// Function to get the correct suffix for the ranking (e.g., "st", "nd", "rd", "th")
function getRankSuffix(rank) {
    if (rank === 1) return "st";
    if (rank === 2) return "nd";
    if (rank === 3) return "rd";
    return "th";
}

module.exports = router;
