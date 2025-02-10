const sqlite3 = require('sqlite3').verbose();

// Open a database connection
const db = new sqlite3.Database('database.db');

// SQL query to delete all rows from UserBadges table
const deleteQuery = 'DELETE FROM UserBadges';

// Execute the query
db.run(deleteQuery, function (err) {
    if (err) {
        console.error('Error deleting rows:', err.message);
        res.status(500).json({ error: 'Internal server error' });
    } else {
        console.log('All rows deleted successfully');
        res.status(200).json({ message: 'All rows deleted successfully' });
    }
});

