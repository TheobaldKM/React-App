const express = require('express');
const router = express.Router();
var cors = require('cors')
const sqlite3 = require('sqlite3').verbose();
const authenticateUser = require('../../middleware/authentication');


// Connect to SQLite database
const db = new sqlite3.Database('database.db');

// Route to add a new entry to UserBadges
router.post('/user-badges', (req, res) => {
    const { userID, badgeID } = req.body;

    // Check if all required fields are present
    if (!userID || !badgeID) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const sql = `INSERT INTO UserBadges (UserID, BadgeID) VALUES (?, ?)`;

    db.run(sql, [userID, badgeID], function (err) {
        if (err) {
            console.error('Error adding user badge:', err.message);
            return res.status(500).json({ error: 'Internal server error' });
        }

        // Send a success response with the ID of the inserted row
        res.json({ id: this.lastID });
    });
});

// Route to retrieve all badges for a specific user from the database
router.get('/:userid', authenticateUser, (req, res) => {
    const userId = req.params.userid; // Get the UserID from the URL parameters
    const authenticatedUserId = req.userId; // Get the authenticated user's ID

    // Updated SQL query to join UserBadges with Badges
    const sqlQuery = `
        SELECT UserBadges.*, Badges.Name AS BadgeName, Badges.Icon AS BadgeIcon
        FROM UserBadges
        INNER JOIN Badges ON UserBadges.BadgeID = Badges.BadgeID
        WHERE UserBadges.UserID = ?`;

    db.all(sqlQuery, [userId], (err, rows) => {
        if (err) {
            console.error('Error querying user badges:', err.message);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            //console.log('User badges:', rows); // Log the output to the console
            res.json(rows); // Send the data as a JSON response
        }
    });
});

module.exports = router;