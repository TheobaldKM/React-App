const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');
console.log('populate-nurseries.js is running...');

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

const nurseryData = [
    {
        Name: 'City Farm Nursery',
        Latitude: -27.442570572954033,
        Longitude: 153.02793312597728,
        URL: 'https://www.nscf.org.au/nursery/'
    },
    {
        Name: 'Crossacres Garden Centre',
        Latitude: -27.612787260456475,
        Longitude: 152.9823249977412,
        URL: 'https://www.crossacresgardencentre.com/'
    },
    {
        Name: 'B4C Sustainability Centre',
        Latitude: -27.50167926684405,
        Longitude: 153.12174198583324,
        URL: 'http://bulimbacreek.org.au/'
    },
    {
        Name: 'Daly’s Native Plants',
        Latitude: -27.53953744490237,
        Longitude: 153.11541070286967,
        URL: 'https://dalysnativeplants.com.au/'
    },
    {
        Name: 'Paten Park Native Nursery',
        Latitude: -27.451367976520064,
        Longitude: 152.95111945736036,
        URL: 'https://ppnn.org.au/'
    },
    {
        Name: 'Downfall Creek Bushland Centre',
        Latitude: -27.3896226461516,
        Longitude: 153.00496263541064,
        URL: 'https://www.brisbane.qld.gov.au/clean-and-green/natural-environment-and-water/environment-centres/downfall-creek-bushland-centre'
    },
    {
        Name: 'Karawatha Forest Discovery Centre',
        Latitude: -27.624301261740488,
        Longitude: 153.09247905757428,
        URL: 'https://www.brisbane.qld.gov.au/clean-and-green/natural-environment-and-water/environment-centres/karawatha-forest-discovery-centre'
    }
];


// Insert Nursery data into the database
db.serialize(() => {
    // Prepare SQL statement
    const stmt = db.prepare(
        'INSERT OR IGNORE INTO Nurseries (Name, Latitude, Longitude, URL) VALUES (?,?,?,?)'
    );

    nurseryData.forEach(nursery => {
        console.log('Inserting nursery:', nursery);
        stmt.run(
            nursery.Name,
            nursery.Latitude,
            nursery.Longitude,
            nursery.URL
        );
    });

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
