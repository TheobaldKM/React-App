const sqlite3 = require('sqlite3').verbose();
console.log('populate-plants.js is running...');

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

// Insert plant care data into the database
db.serialize(() => {
    // Prepare SQL statement for inserting plant care data
    const stmt = db.prepare(
      'INSERT INTO PlantCare (PlantID, PlantType, LightRequirement, WaterFrequency, Season, OtherInstructions, PlantHeight) VALUES (?, ?, ?, ?, ?, ?, ?)'
    );
  
    // Define plant care information
    const plantCareData = [
      // Light Requirement Level: Full Sun > Full Sun to semi-shade > full sun to light shade > full sun to partial shade > partial shade
      // Groundcovers
      { PlantType: 'Groundcover', LightRequirement: '5', WaterFrequency: '5', Season: 'All year', OtherInstructions: 'Well-drained soil', PlanHeight: '0.6m' },
      { PlantType: 'Groundcover', LightRequirement: '5', WaterFrequency: '5', Season: 'Summer', OtherInstructions: 'Well-drained soil', PlanHeight: '1m' },
      { PlantType: 'Groundcover', LightRequirement: '5', WaterFrequency: '5', Season: 'Spring & Summer', OtherInstructions: 'Well-drained soil', PlanHeight: '0.6m' },
      { PlantType: 'Groundcover', LightRequirement: '1', WaterFrequency: '5', Season: 'All year', OtherInstructions: 'Damp shady areas', PlanHeight: '0.15m' },
      // Tufting plants and grasses
      { PlantType: 'Tufting plant', LightRequirement: '5', WaterFrequency: '5', Season: 'Spring', OtherInstructions: 'Well-drained soil', PlanHeight: '0.45m' },
      { PlantType: 'Tufting plant', LightRequirement: '5', WaterFrequency: '5', Season: 'All year', OtherInstructions: 'Great for ponds or water features', PlanHeight: '1m' },
      { PlantType: 'Tufting plant', LightRequirement: '2', WaterFrequency: '5', Season: 'Spring & Summer', OtherInstructions: 'Well-drained soil', PlanHeight: '1m' },
      // Climbers
      { PlantType: 'Climber', LightRequirement: '2', WaterFrequency: '5', Season: 'Spring & Summer', OtherInstructions: 'Well-drained soil', PlanHeight: '3m' },
      { PlantType: 'Climber', LightRequirement: '5', WaterFrequency: '5', Season: 'Spring', OtherInstructions: 'Well-drained soil', PlanHeight: '6m' },
      { PlantType: 'Climber', LightRequirement: '4', WaterFrequency: '5', Season: 'Winter & Spring', OtherInstructions: 'Well-drained soil', PlanHeight: '3m' },
      // Small shrubs
      { PlantType: 'Small shrub', LightRequirement: '5', WaterFrequency: '5', Season: 'Spring & Summer', OtherInstructions: 'Moist, well-drained, sunny position', PlanHeight: '2m' },
      { PlantType: 'Small shrub', LightRequirement: '5', WaterFrequency: '5', Season: 'Spring & Summer', OtherInstructions: 'Exposed sites and coastal gardens', PlanHeight: '2m' },
      { PlantType: 'Small shrub', LightRequirement: '5', WaterFrequency: '5', Season: 'Spring', OtherInstructions: 'Full sun, well-drained soil', PlanHeight: '1m' },
      { PlantType: 'Small shrub', LightRequirement: '5', WaterFrequency: '5', Season: 'All year', OtherInstructions: 'Sunny position, well-drained soil', PlanHeight: '2m' },
      { PlantType: 'Small shrub', LightRequirement: '5', WaterFrequency: '5', Season: 'Spring & Summer', OtherInstructions: 'Sunny position, well-drained soil', PlanHeight: '2m' },
      { PlantType: 'Small shrub', LightRequirement: '5', WaterFrequency: '5', Season: 'Autumn to Spring', OtherInstructions: 'Full sun, well-drained soil', PlanHeight: '2m' },
      { PlantType: 'Small shrub', LightRequirement: '5', WaterFrequency: '5', Season: 'Spring & Autumn', OtherInstructions: 'Full sun to light shade, moist well-drained soil', PlanHeight: '0.8-2m' },
      // Medium shrubs
      { PlantType: 'Medium shrub', LightRequirement: '5', WaterFrequency: '5', Season: 'Summer', OtherInstructions: 'Full sun, well-drained soil', PlanHeight: '1m' },
      { PlantType: 'Medium shrub', LightRequirement: '5', WaterFrequency: '5', Season: 'Summer to Spring', OtherInstructions: 'Moist, well-drained soil, sunny position', PlanHeight: '3m' },
      { PlantType: 'Medium shrub', LightRequirement: '5', WaterFrequency: '5', Season: 'Spring & Summer', OtherInstructions: 'Sunny position, well-drained soil', PlanHeight: '5m' },
      { PlantType: 'Medium shrub', LightRequirement: '5', WaterFrequency: '5', Season: 'All year', OtherInstructions: 'Sunny position, well-drained soil', PlanHeight: '5m' },
      { PlantType: 'Medium shrub', LightRequirement: '3', WaterFrequency: '5', Season: 'Spring & Summer', OtherInstructions: 'Sunny position, well-drained soil', PlanHeight: '5m' },
      // Shade and feature trees
      { PlantType: 'Shade tree', LightRequirement: '5', WaterFrequency: '5', Season: 'Spring', OtherInstructions: 'Full sun, well-drained soil', PlanHeight: '5m' },
      { PlantType: 'Shade tree', LightRequirement: '2', WaterFrequency: '5', Season: 'Spring', OtherInstructions: 'Full sun to part shade, well-drained soil', PlanHeight: '8m' },
      { PlantType: 'Shade tree', LightRequirement: '4', WaterFrequency: '5', Season: 'Summer to Winter', OtherInstructions: 'Full sun to semi-shade, moist well-drained soil', PlanHeight: '8m' },
      { PlantType: 'Shade tree', LightRequirement: '2', WaterFrequency: '5', Season: 'Spring to Autumn', OtherInstructions: 'Full sun to partial shade, organic-rich soil', PlanHeight: '8m' },
      { PlantType: 'Shade tree', LightRequirement: '5', WaterFrequency: '5', Season: 'Autumn', OtherInstructions: 'Open sunny position, light to medium soil', PlanHeight: '8m' },
      { PlantType: 'Shade tree', LightRequirement: '5', WaterFrequency: '5', Season: 'Summer', OtherInstructions: 'Sunny position, well-drained soil', PlanHeight: '10m' },
      { PlantType: 'Shade tree', LightRequirement: '5', WaterFrequency: '5', Season: 'Winter & Spring', OtherInstructions: 'Sunny position, well-drained soil', PlanHeight: '6m' },
    ];
  
    // Insert each plant care data into the table
    plantCareData.forEach((care, index) => {
      stmt.run(
        index + 1, // PlantID (index starts from 1)
        care.PlantType,
        care.LightRequirement,
        care.WaterFrequency,
        care.Season,
        care.OtherInstructions,
        care.PlanHeight,
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
  