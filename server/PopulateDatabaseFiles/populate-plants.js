const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');
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



// Define plant data
const plantsData = [
    // Groundcovers
    {
      Name: 'Cut Leaf Daisy (Brachyscome multifida)',
      Description: 'Hardy eye-catching ground cover to 60 centimetres with purple daisy flowers throughout the year. Best grown well-drained soils in full sun. Especially effective in rockeries, mass plantings, pots, hanging baskets and borders.',
      Attracts: 'Bees, lizards',
      GrowingConditions: 'Full sun, well-drained soil',
      PlantPicture: null 
    },
    {
      Name: 'Creeping Boobialla (Myoporum sp.)',
      Description: 'Hardy prostrate groundcover that grows to 1 metre. Purple or white flowers during the summer months. An excellent spreading groundcover for a sunny well-drained position. Suitable in pots or containers.',
      Attracts: 'Birds, lizards',
      GrowingConditions: 'Full sun, well-drained soil',
      PlantPicture: null
    },
    {
      Name: 'Fan Flower (Scaevola aemula)',
      Description: 'Spreading groundcover that grows to 60 centimetres with dark green foliage and small mauve-pink flowers in spring and summer. Prefers well-drained soils. Great for hanging baskets.',
      Attracts: 'Bees, lizards',
      GrowingConditions: 'Well-drained soil',
      PlantPicture: null
    },
    {
      Name: 'Native Violet (Viola banksii)',
      Description: 'Attractive dense groundcover that grows to 15 centimetres suitable for damp shady areas. Small, round, light green leaves with violet flowers throughout the year. Ideal for rockeries, mass plantings, pots and hanging baskets.',
      Attracts: 'Lizards, frogs',
      GrowingConditions: 'Damp shady areas',
      PlantPicture: null
    },
    // Tufting plants and grasses
    {
      Name: 'Blue Flax (Dianella caerulea)',
      Description: 'Hardy plant with long, strappy leaves that grows to 45 centimetres. Blue flowers on branched spikes appear in spring. Bright blue berries occur after flowering. Prefers a sunny position in well-drained soil.',
      Attracts: 'Birds, lizards',
      GrowingConditions: 'Full sun, well-drained soil',
      PlantPicture: null
    },

    {
        Name: 'Knobby Club Rush (Ficinia nodosa)',
        Description: 'Tough, fast-growing, spreading, tufting grass with upright, dark green foliage up to 1 metre. Brownish flower heads are produced on spikes throughout the year.',
        Attracts: 'Birds, lizards',
        GrowingConditions: 'Full sun. Great for ponds or water features.',
        PlantPicture: null
      },

    {
        Name: 'Mat Rush (Lomandra sp.)',
        Description: 'Deep green, glossy, narrow strap leaves to 1 metre. Small yellow-cream flowers in spring and summer',
        Attracts: 'Birds, lizards',
        GrowingConditions: 'Full sun to partial shade.',
        PlantPicture: null
      },
    
    // Climbers
    {
      Name: 'Guinea Vine (Hibbertia scandens)',
      Description: 'A vigorous twiner with glossy, dark green leaves and large, golden yellow flowers over spring and summer. Grows to 3 metres and makes an excellent screening plant on walls or fences. Prefers well-drained soil. Grow in full sun to partial shade in an open position.',
      Attracts: 'Birds',
      GrowingConditions: 'Full sun to partial shade',
      PlantPicture: null
    },
    {
        Name: 'Pandorea (Pandorea sp.)',
        Description: 'A hardy, vigorous, fast-growing, evergreen twining plant with bell-shaped pink or white flowers in spring followed by large oblong-shaped seed pods. Spreads up to 6 metres. Prefers an open, sunny position in well-drained soil. Great as a screening plant on a fence or trellis. Will grow in a large pot.',
        Attracts: 'Butterflies, bees, insects',
        GrowingConditions: 'Open, sunny position, well-drained soil',
        PlantPicture: null
      },
      {
        Name: 'Sarsaparilla Vine (Hardenbergia sp.)',
        Description: 'Fast-growing, low-maintenance, heavy flowering climber with dark green leathery leaves. Grows to 3 metres. Long-lasting dark purple flowers appear over winter and spring. Plant in a full sun to semi-shade position in well-drained soil. Plant to trail over fences for privacy, retaining walls, or on a trellis. Will grow in a large pot. Stunning when mass planted.',
        Attracts: 'Bees, birds, butterflies, insects',
        GrowingConditions: 'Full sun to semi-shade, well-drained soil',
        PlantPicture: null
      },
    
    // Small shrubs
    {
      Name: 'Bottlebrush (Callistemon sp.)',
      Description: 'Fast growing, hardy, woody shrub that grows up to two metres that produces beautiful blooms in a variety of single colours in spring and summer and sometimes again in autumn. Plant in a moist, well-drained, sunny position. Regularly prune to encourage bushier growth and increased flower production.',
      Attracts: 'Birds, insects',
      GrowingConditions: 'Moist, well-drained, sunny position',
      PlantPicture: null
    },
    
    {
        Name: 'Coastal Rosemary (Westringia sp.)',
        Description: 'Hardy, small, fast-growing, evergreen shrub that grows to 1m². Long flowering and suitable as a hedge or screening plant or for low maintenance gardens, exposed sites and coastal gardens. Suitable for container planting.',
        Attracts: 'Birds, butterflies, insects',
        GrowingConditions: 'Full sun, well-drained soil',
        PlantPicture: null
      },
      {
        Name: 'Grevillea (Grevillea sp.)',
        Description: 'Showy, evergreen plants that grow to two metres with nectar-rich flowers. They produce a "spider flower" in a variety of single colours throughout the year. Grevilleas do best in a sunny position with light, gritty, free-draining soil.',
        Attracts: 'Birds, bees, butterflies',
        GrowingConditions: 'Sunny position, well-drained soil',
        PlantPicture: null
      },
      {
        Name: 'Lilly Pilly (Syzygium sp.)',
        Description: 'Hardy evergreen plants to two metres with glossy, green leaves with fluffy, pom-pom, white or pink flowers in spring and summer followed by pink or red berries. Prefers a sunny position with well-drained soil. Lilly Pillies make excellent screens, windbreaks, and hedges and can be pruned to size and shape.',
        Attracts: 'Birds, bees',
        GrowingConditions: 'Sunny position, well-drained soil',
        PlantPicture: null
      },
      {
        Name: 'Swamp Banksia (Banksia robur)',
        Description: 'Hardy, evergreen shrub to two metres with bold flowing spikes in a variety of single colours. Flowers appear from autumn through to spring. Plant in an open, sunny position in well-drained soil. To encourage flower production and thicker foliage, cut flowering spikes and use in a floral display.',
        Attracts: 'Birds, bees, butterflies, insects',
        GrowingConditions: 'Full sun, well-drained soil',
        PlantPicture: null
      },
      {
        Name: 'Tea Tree (Leptospermum sp.)',
        Description: 'Attractive small shrub ranging in size from 80 centimetres up to two metres. Showy pink or white flowers in spring and autumn. Prefers moist well-drained soil in full sun or light shade. A useful feature plant for rockeries or over retaining walls.',
        Attracts: 'Insects, bees',
        GrowingConditions: 'Full sun to light shade, moist well-drained soil',
        PlantPicture: null
      },
      {
        Name: 'Thyme Honey Myrtle (Melaleuca thymifolia)',
        Description: 'Small hardy shrub to 1m². Mauve claw-type flowers occur in clusters and are borne during summer. Grows best in full sun with good drainage. Suitable for large pots or containers.',
        Attracts: 'Insects',
        GrowingConditions: 'Full sun, well-drained soil',
        PlantPicture: null
      },

    
    // Medium shrubs
    {
      Name: 'Banksia (Banksia sp.)',
      Description: 'Hardy evergreen shrubs with attractive foliage with bold cream-golden flowering spikes appearing over late summer to spring. Grows to 3 metres. Plant in an open sunny position in very well-drained soil. Regularly prune to encourage dense growth.',
      Attracts: 'Birds',
      GrowingConditions: 'Full sun, well-drained soil',
      PlantPicture: null
    },
    {
        Name: 'Bottlebrush (Callistemon sp.)',
        Description: 'Hardy, woody shrub that grows up to five metres that produces beautiful blooms in a variety of single colours in spring and summer and sometimes again in autumn. Plant in a moist, well-drained, sunny position. Regularly prune to encourage bushier growth and increased flower production. Bottlebrushes make excellent screening plants and are quick growers.',
        Attracts: 'Birds, insects',
        GrowingConditions: 'Moist, well-drained soil, sunny position',
        PlantPicture: null
      },
      {
        Name: 'Grevillea (Grevillea sp.)',
        Description: 'Showy, evergreen plants that grow to 5 metres with nectar-rich flowers. They produce a "spider flower" in a variety of single colours throughout the year. Grevilleas do best in a sunny position with light, gritty, free-draining soil.',
        Attracts: 'Birds, bees, butterflies',
        GrowingConditions: 'Sunny position, well-drained soil',
        PlantPicture: null
      },
      {
        Name: 'Lilly Pilly (Syzygium sp.)',
        Description: 'Hardy evergreen plants to 5 metres with glossy, green leaves with fluffy, pom-pom, white flowers in spring and summer followed by pink or red berries. Prefers a sunny position with well-drained soil. Lilly Pillies make excellent screens, windbreaks, and hedges and can be pruned to size and shape.',
        Attracts: 'Birds, bees, flying foxes',
        GrowingConditions: 'Sunny position, well-drained soil',
        PlantPicture: null
      },
      {
        Name: 'Tea Tree (Leptospermum sp.)',
        Description: 'A bushy rounded shrub that grows to 5 metres. White or pink flowers cover the shrub in spring. Prefers well-drained soil in a sunny position. Ideal as a screen, hedge, or windbreak.',
        Attracts: 'Insects, bees',
        GrowingConditions: 'Sunny position, well-drained soil',
        PlantPicture: null
      },
    
    // Shade and feature trees
    {
      Name: 'Blush Satinash (Acmena hemilampra)',
      Description: 'An evergreen tree with a dense crown, glossy green foliage, bright copper-tan new growth. Quick to establish and grows to 8 metres. Clusters of small white flowers appear in spring. Plant in full sun in well-drained soil. Suitable as a feature tree, screen or hedge.',
      Attracts: 'Birds, bees, butterflies',
      GrowingConditions: 'Full sun, well-drained soil',
      PlantPicture: null
    },
    {
        Name: 'Golden Penda (Xanthostemon chrysanthus)',
        Description: 'An attractive specimen tree up to 8 metres. Showy, dense cluster of golden yellow flowers appear from summer to winter. Plant in full sun to part shade in well-drained soil. Suitable as a hedge, windbreak, screen, or feature tree.',
        Attracts: 'Birds',
        GrowingConditions: 'Full sun to part shade, well-drained soil',
        PlantPicture: null
      },
      {
        Name: 'Ivory Curl Tree (Buckinghamia cellsissima)',
        Description: 'Fast-growing evergreen tree that grows to 8 metres. Striking, long, creamy-fragrant, honey-producing flowers appear from spring until autumn. Prefers moist, well-drained soil in a full sun to semi-shade position.',
        Attracts: 'Birds, bees',
        GrowingConditions: 'Full sun to semi-shade, moist well-drained soil',
        PlantPicture: null
      },
      {
        Name: 'Tuckeroo (Cupaniopsis anacardioides)',
        Description: 'Attractive evergreen shade tree with rounded canopy. Grows to 8 metres. Green-yellow flowers are produced in autumn followed by orange fruits in winter. Plant in full sun to partial shade position in organic-rich soil. Ideal as a shade or specimen tree.',
        Attracts: 'Birds, bees, insects',
        GrowingConditions: 'Full sun to partial shade, organic-rich soil',
        PlantPicture: null
      },
      {
        Name: 'Tulipwood (Harpulia pendula)',
        Description: 'A hardy, fast-growing, evergreen tree that grows up to 10 metres with attractive, pale green foliage. Large sprays of light green-yellow, slightly fragrant flowers appear in summer followed by orange fruit. Requires an open sunny position in a light to medium soil type. Excellent shade tree.',
        Attracts: 'Birds, bees',
        GrowingConditions: 'Open sunny position, light to medium soil',
        PlantPicture: null
      },
      {
        Name: 'Wattle (Acacia sp.)',
        Description: 'Stunning and iconic Australian tree with masses of bright or pale-yellow ball-shaped flowers in winter and spring. Grows to 6 metres. Prefers a sunny position in well-drained soil. Wattles are suitable as a hedging plant or as a screen.',
        Attracts: 'Birds, butterflies, bees',
        GrowingConditions: 'Sunny position, well-drained soil',
        PlantPicture: null
      },
      {
        Name: 'Weeping Lilly Pilly (Waterhousia floribundum)',
        Description: 'Hardy, evergreen tree that grows to 8m². Clusters of white flowers appear from spring to summer, followed by green, round fruits. Plant in a sunny open position in well-drained soil. Regular trimming will produce colourful, new growth and keep the plant bushy. Can be trimmed to shape and size. Ideal as a dense screen or windbreak, or stunning as a large container plant.',
        Attracts: 'Birds, bees',
        GrowingConditions: 'Sunny position, well-drained soil',
        PlantPicture: null
      }
  ];


  // Function to read image file and convert to Base64
function getImageBase64(filePath) {
  try {
    // Read image file synchronously
    const imageData = fs.readFileSync(filePath);
    // Convert image data to Base64
    return imageData.toString('base64');
  } catch (error) {
    console.error('Error reading image file:', error);
    return null;
  }
}

// Directory containing image files
const directoryPath = "server/PopulateDatabaseFiles/plantImages/";

// Get a list of files in the directory
const files = fs.readdirSync(directoryPath);

// Insert plant data into the database
db.serialize(() => {
  // Prepare SQL statement
  const stmt = db.prepare(
    'INSERT INTO Plants (Name, Description, Attracts, GrowingConditions, PlantPicture) VALUES (?, ?, ?, ?, ?)'
  );

  // Insert each plant data into the table
  plantsData.forEach(plant => {
    // Construct the file path using the plant name
    const imagePath = path.join(directoryPath, `${plant.Name}.jpg`); 
    // Get Base64 encoded image data
    const imageBase64 = getImageBase64(imagePath);
    // Insert plant data with image Base64
    stmt.run(
      plant.Name,
      plant.Description,
      plant.Attracts,
      plant.GrowingConditions,
      imageBase64
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
  