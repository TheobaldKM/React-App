const sqlite3 = require('sqlite3');


// Connect to SQLite database
const db = new sqlite3.Database('database.db', err => {
  if (err) {
    console.error('Error opening database connection:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Define SQL statements for creating tables
const createTablesSQL = [
  `CREATE TABLE IF NOT EXISTS Suburb (
    SuburbName TEXT,
    SuburbCode TEXT PRIMARY KEY,
    SuburbLatitude REAL,
    SuburbLongitude REAL,
    SuburbSoil TEXT
)`,
  `CREATE TABLE IF NOT EXISTS Plants (
    PlantID INTEGER PRIMARY KEY,
    Name TEXT NOT NULL, 
    Description TEXT,
    Attracts TEXT,
    GrowingConditions TEXT,
    PlantPicture BLOB
  )`,
  `CREATE TABLE IF NOT EXISTS PlantCare (
    PlantID INT PRIMARY KEY,
    PlantType VARCHAR(255),
    LightRequirement VARCHAR(255),
    WaterFrequency VARCHAR(255),
    Season VARCHAR(255),
    OtherInstructions TEXT,
    PlantHeight TEXT,
    FOREIGN KEY (PlantID) REFERENCES Plants(PlantID)
)`,
  `CREATE TABLE IF NOT EXISTS Badges (
    BadgeID INTEGER PRIMARY KEY,
    Name TEXT,
    Description TEXT,
    Icon TEXT
  )`,
  `CREATE TABLE IF NOT EXISTS Nurseries (
    Name TEXT PRIMARY KEY,
    Longitude REAL,
    Latitude REAL,
    URL TEXT
  )`,
  `CREATE TABLE IF NOT EXISTS Users (
    UserID INTEGER PRIMARY KEY,
    Username TEXT NOT NULL,
    PasswordHash TEXT NOT NULL,
    Email TEXT UNIQUE,
    SuburbID INTEGER,
    FOREIGN KEY (SuburbID) REFERENCES Suburb(SuburbID)
  )`,
  `CREATE TABLE IF NOT EXISTS UserPlants (
    UserPlantsID INTEGER,
    UserID INTEGER,
    PlantID INTEGER,
    Nickname TEXT,
    Date TEXT,
    Suburb TEXT,
    PlantPhoto BLOB,
    PRIMARY KEY (UserPlantsID, UserID),
    FOREIGN KEY (Suburb) REFERENCES Suburb(SuburbName),
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (PlantID) REFERENCES Plants(PlantID)
  )`,
 ` CREATE TABLE IF NOT EXISTS PlantUpdates (
    UpdateID INTEGER PRIMARY KEY AUTOINCREMENT,
    UserPlantsID INTEGER,
    UserID INTEGER,
    PlantID INTEGER,
    UpdateType TEXT,
    Comment TEXT,
    Date TEXT,
    Suburb TEXT,
    UserName TEXT,
    Public BOOLEAN,
    PlantSpecies TEXT,
    Image BLOB,
    FOREIGN KEY (UserPlantsID) REFERENCES UserPlants(UserPlantsID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (PlantID) REFERENCES Plants(PlantID)
)`,
  `CREATE TABLE IF NOT EXISTS SuburbStats (
    SuburbStatID INTEGER PRIMARY KEY,
    SuburbCode TEXT UNIQUE,
    PlantCount INTEGER,
    FOREIGN KEY (SuburbCode) REFERENCES Suburb(SuburbCode)
  )`,
  `CREATE TABLE IF NOT EXISTS Events (
    EventID INTEGER PRIMARY KEY,
    Title TEXT,
    Description TEXT,
    EventDate DATE
  )`,
  `CREATE TABLE IF NOT EXISTS EventParticipation (
    UserEventID INTEGER PRIMARY KEY,
    UserID INTEGER,
    EventID INTEGER,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (EventID) REFERENCES Events(EventID)
  )`,
  `CREATE TABLE IF NOT EXISTS UserBadges (
    UserBadgeID INTEGER PRIMARY KEY,
    UserID INTEGER,
    BadgeID INTEGER,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (BadgeID) REFERENCES Badges(BadgeID)
  )`,
  `CREATE TABLE IF NOT EXISTS CommunityPhotos (
    PhotoID INTEGER PRIMARY KEY,
    UserID INTEGER,
    PlantID INTEGER,
    PhotoURL TEXT,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (PlantID) REFERENCES Plants(PlantID)
  )`
];

// Function to create tables
function createTables() {
  createTablesSQL.forEach(sql => {
    db.run(sql, err => {
      if (err) {
        console.error('Error creating table:', err.message);
      }
    });
  });
}


// Close the database connection when the Node.js process is terminated
process.on('SIGINT', () => {
  db.close(err => {
    if (err) {
      return console.error('Error closing database connection:', err.message);
    }
    console.log('Closed the database connection.');
    process.exit(0);
  });
});

function createDatabase() {
  return new Promise((resolve, reject) => {
      createTables();
      console.log("Database creation started...");
      setTimeout(() => {
          console.log("Database created.");
          resolve();
      }, 1000); // Simulating some asynchronous process
  });
}


// Export the database object and the createTables function
module.exports = { db, createDatabase };