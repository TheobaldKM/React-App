const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');
console.log('populate-suburbs.js is running...');

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

const suburbData = [
    {
        Name: 'Annerley',
        Code: 'AN',
        Latitude: -27.4997,
        Longitude: 153.0319,
        Soil: 'Gravelly red and yellow loamy top soils over clay'
    },
    {
        Name: 'Brisbane City',
        Code: 'BC',
        Latitude: -27.4698,
        Longitude: 153.0251,
        Soil: 'Gravelly red and yellow loamy top soils over clay'
    },
    {
        Name: 'Fortitude Valley',
        Code: 'FV',
        Latitude: -27.4569,
        Longitude: 153.0365,
        Soil: ''
    },
    {
        Name: 'New Farm',
        Code: 'NF',
        Latitude: -27.4674,
        Longitude: 153.0495,
        Soil: 'Shallow gravelly soils'
    },
    {
        Name: 'West End',
        Code: 'WE',
        Latitude: -27.4812,
        Longitude: 153.0121,
        Soil: 'Shallow gravelly soils'
    },
    {
        Name: 'Highgate Hill',
        Code: 'HH',
        Latitude: -27.4846,
        Longitude: 153.0113,
        Soil: 'Gravelly red and yellow loamy top soils over clay'
    },
    {
        Name: 'Paddington',
        Code: 'PD',
        Latitude: -27.4613,
        Longitude: 153.0069,
        Soil: 'Gravelly red and yellow loamy top soils over clay'
    },
    {
        Name: 'Kangaroo Point',
        Code: 'KP',
        Latitude: -27.4812,
        Longitude: 153.0347,
        Soil: 'Gravelly red and yellow loamy top soils over clay'
    },
    {
        Name: 'Newstead',
        Code: 'NS',
        Latitude: -27.4418,
        Longitude: 153.0468,
        Soil: 'Shallow gravelly soils'
    },
    {
        Name: 'Teneriffe',
        Code: 'TE',
        Latitude: -27.4468,
        Longitude: 153.0510,
        Soil: 'Shallow gravelly soils'
    },
    {
        Name: 'Milton',
        Code: 'MT',
        Latitude: -27.4679,
        Longitude: 153.0061,
        Soil: 'Not Available'
    },
    {
        Name: 'Bowen Hills',
        Code: 'BH',
        Latitude: -27.4491,
        Longitude: 153.0380,
        Soil: 'Gravelly red and yellow loamy top soils over clay'
    },
    {
        Name: 'St Lucia',
        Code: 'SL',
        Latitude: -27.4954,
        Longitude: 153.0130,
        Soil: 'Shallow gravelly soils'
    },
    {
        Name: 'Chermside',
        Code: 'CH',
        Latitude: -27.3861,
        Longitude: 153.0327,
        Soil: 'Gravelly red and yellow loamy top soils over clay'
    },
    {
        Name: 'Carindale',
        Code: 'CA',
        Latitude: -27.5017,
        Longitude: 153.1028,
        Soil: 'Gravelly red and yellow loamy top soils over clay'
    },
    {
        Name: 'Carina',
        Code: 'CR',
        Latitude: -27.4985,
        Longitude: 153.1023,
        Soil: 'Gravelly red and yellow loamy top soils over clay'
    },
    {
        Name: 'Camp Hill',
        Code: 'CH',
        Latitude: -27.4933,
        Longitude: 153.0711,
        Soil: 'Shallow gravelly soils'
    },
    {
        Name: 'Holland Park',
        Code: 'HP',
        Latitude: -27.5208,
        Longitude: 153.0503,
        Soil: 'Gravelly red and yellow loamy top soils over clay'
    },
    {
        Name: 'Wynnum',
        Code: 'WY',
        Latitude: -27.4440,
        Longitude: 153.1759,
        Soil: 'Deep red loamy soils'
    },
    {
        Name: 'Wynnum West',
        Code: 'WW',
        Latitude: -27.4509,
        Longitude: 153.1623,
        Soil: 'Gravelly red and yellow loamy top soils over clay'
    },
    {
        Name: 'Manly',
        Code: 'MA',
        Latitude: -27.4549,
        Longitude: 153.1859,
        Soil: 'Deep red loamy soils'
    },
    {
        Name: 'Capalaba',
        Code: 'CP',
        Latitude: -27.5226,
        Longitude: 153.2033,
        Soil: 'Not Available'
    },
    {
        Name: 'Alexandra Hills',
        Code: 'AH',
        Latitude: -27.5257,
        Longitude: 153.2332,
        Soil: 'Not Available'
    },
    {
        Name: 'Cleveland',
        Code: 'CL',
        Latitude: -27.5236,
        Longitude: 153.2628,
        Soil: 'Not Available'
    },
    {
        Name: 'Victoria Point',
        Code: 'VP',
        Latitude: -27.5852,
        Longitude: 153.2934,
        Soil: 'Not Available'
    },
    {
        Name: 'Birkdale',
        Code: 'BI',
        Latitude: -27.5003,
        Longitude: 153.2359,
        Soil: 'Not Available'
    },
    {
        Name: 'Thornlands',
        Code: 'TH',
        Latitude: -27.5785,
        Longitude: 153.2633,
        Soil: 'Not Available'
    },
    {
        Name: 'Ormiston',
        Code: 'OR',
        Latitude: -27.4980,
        Longitude: 153.2580,
        Soil: 'Not Available'
    },
    {
        Name: 'Wellington Point',
        Code: 'WP',
        Latitude: -27.4874,
        Longitude: 153.2566,
        Soil: 'Not Available'
    },
    {
        Name: 'Redland Bay',
        Code: 'RB',
        Latitude: -27.6329,
        Longitude: 153.3117,
        Soil: 'Not Available'
    },
    {
        Name: 'Mount Gravatt',
        Code: 'MG',
        Latitude: -27.5504,
        Longitude: 153.0827,
        Soil: 'Shallow gravelly soils'
    },
    {
        Name: 'Mount Gravatt East',
        Code: 'ME',
        Latitude: -27.5275,
        Longitude: 153.0873,
        Soil: 'Gravelly red and yellow loamy top soils over clay'
    },
    {
        Name: 'Coorparoo',
        Code: 'CO',
        Latitude: -27.4957,
        Longitude: 153.0563,
        Soil: 'Gravelly red and yellow loamy top soils over clay'
    },
    {
        Name: 'Hawthorne',
        Code: 'HA',
        Latitude: -27.4558,
        Longitude: 153.0619,
        Soil: 'Dark alluvial soils'
    },
    {
        Name: 'Mount Ommaney',
        Code: 'MO',
        Latitude: -27.5444,
        Longitude: 152.9338,
        Soil: 'Gravelly red and yellow loamy top soils over clay'
    },
    {
        Name: 'Jindalee',
        Code: 'JI',
        Latitude: -27.5294,
        Longitude: 152.9399,
        Soil: 'Dark alluvial soils'
    },
    {
        Name: 'Sinnamon Park',
        Code: 'SP',
        Latitude: -27.5381,
        Longitude: 152.9538,
        Soil: 'Gravelly red and yellow loamy top soils over clay'
    },
    {
        Name: 'Jamboree Heights',
        Code: 'JH',
        Latitude: -27.5506,
        Longitude: 152.9507,
        Soil: 'Gravelly red and yellow loamy top soils over clay'
    },
    {
        Name: 'Middle Park',
        Code: 'MP',
        Latitude: -27.5447,
        Longitude: 152.9528,
        Soil: 'Gravelly red and yellow loamy top soils over clay'
    },
    {
        Name: 'Riverhills',
        Code: 'RH',
        Latitude: -27.5627,
        Longitude: 152.9519,
        Soil: 'Gravelly red and yellow loamy top soils over clay'
    },
    {
        Name: 'Seventeen Mile Rocks',
        Code: 'SR',
        Latitude: -27.5520,
        Longitude: 152.9339,
        Soil: 'Gravelly red and yellow loamy top soils over clay'
    },
    {
        Name: 'Sunnybank',
        Code: 'SB',
        Latitude: -27.5747,
        Longitude: 153.0569,
        Soil: 'Deep red loamy soils'
    },
    {
        Name: 'Macgregor',
        Code: 'MG',
        Latitude: -27.5703,
        Longitude: 153.0787,
        Soil: 'Deep red loamy soils'
    },
    {
        Name: 'Sunnybank Hills',
        Code: 'SH',
        Latitude: -27.6120,
        Longitude: 153.0462,
        Soil: 'Deep red loamy soils'
    },
    {
        Name: 'Runcorn',
        Code: 'RU',
        Latitude: -27.6019,
        Longitude: 153.0828,
        Soil: 'Dark alluvial soils'
    },
    {
        Name: 'Acacia Ridge',
        Code: 'AR',
        Latitude: -27.5761,
        Longitude: 153.0254,
        Soil: 'Gravelly red and yellow loamy top soils over clay'
    },
    {
        Name: 'Algester',
        Code: 'AL',
        Latitude: -27.6212,
        Longitude: 153.0368,
        Soil: 'Gravelly red and yellow loamy top soils over clay'
    },
    {
        Name: 'Parkinson',
        Code: 'PA',
        Latitude: -27.6240,
        Longitude: 153.0483,
        Soil: 'Gravelly red and yellow loamy top soils over clay'
    },
    {
        Name: 'Calamvale',
        Code: 'CA',
        Latitude: -27.6181,
        Longitude: 153.0593,
        Soil: 'Gravelly red and yellow loamy top soils over clay'
    },
    {
        Name: 'Stretton',
        Code: 'ST',
        Latitude: -27.6280,
        Longitude: 153.0747,
        Soil: 'Gravelly red and yellow loamy top soils over clay'
    },
    {
        Name: 'Doolandella',
        Code: 'DO',
        Latitude: -27.6208,
        Longitude: 152.9558,
        Soil: 'Gravelly red and yellow loamy top soils over clay'
    },
    {
        Name: 'Inala',
        Code: 'IN',
        Latitude: -27.6093,
        Longitude: 152.9787,
        Soil: 'Gravelly red and yellow loamy top soils over clay'
    },
    {
        Name: 'Durack',
        Code: 'DU',
        Latitude: -27.5992,
        Longitude: 152.9662,
        Soil: 'Gravelly red and yellow loamy top soils over clay'
    },
    {
        Name: 'Richlands',
        Code: 'RI',
        Latitude: -27.5980,
        Longitude: 152.9652,
        Soil: 'Gravelly red and yellow loamy top soils over clay'
    },
    {
        Name: 'Bellbowrie',
        Code: 'BE',
        Latitude: -27.5619,
        Longitude: 152.8988,
        Soil: 'Gravelly red and yellow loamy top soils over clay'
    },
    {
        Name: 'Kenmore',
        Code: 'KE',
        Latitude: -27.5175,
        Longitude: 152.9487,
        Soil: 'Gravelly red and yellow loamy top soils over clay'
    },
    {
        Name: 'Chapel Hill',
        Code: 'CH',
        Latitude: -27.4950,
        Longitude: 152.9496,
        Soil: ''
    },
    {
        Name: 'Brookfield',
        Code: 'BR',
        Latitude: -27.5097,
        Longitude: 152.9058,
        Soil: 'Gravelly red and yellow loamy top soils over clay'
    },
    {
        Name: 'Upper Kedron',
        Code: 'UK',
        Latitude: -27.4156,
        Longitude: 152.9196,
        Soil: 'Gravelly red and yellow loamy top soils over clay'
    },
    {
        Name: 'The Gap',
        Code: 'TG',
        Latitude: -27.4449,
        Longitude: 152.9475,
        Soil: 'Shallow gravelly soils'
    },
    {
        Name: 'Enoggera',
        Code: 'EN',
        Latitude: -27.4214,
        Longitude: 152.9933,
        Soil: 'Gravelly red and yellow loamy top soils over clay'
    },
    {
        Name: 'Ashgrove',
        Code: 'AG',
        Latitude: -27.4438,
        Longitude: 152.9943,
        Soil: 'Shallow gravelly soils'
    },
    {
        Name: 'Bardon',
        Code: 'BA',
        Latitude: -27.4529,
        Longitude: 152.9809,
        Soil: 'Gravelly red and yellow loamy top soils over clay'
    },
    {
        Name: 'Red Hill',
        Code: 'RH',
        Latitude: -27.4572,
        Longitude: 153.0073,
        Soil: ''
    },
    {
        Name: 'Alderley',
        Code: 'AL',
        Latitude: -27.4162,
        Longitude: 153.0012,
        Soil: ''
    },
    {
        Name: 'Grange',
        Code: 'GR',
        Latitude: -27.4235,
        Longitude: 153.0253,
        Soil: 'Gravelly red and yellow loamy top soils over clay'
    },
    {
        Name: 'Wilston',
        Code: 'WI',
        Latitude: -27.4359,
        Longitude: 153.0071,
        Soil: 'Gravelly red and yellow loamy top soils over clay'
    },
    {
        Name: 'Windsor',
        Code: 'WI',
        Latitude: -27.4393,
        Longitude: 153.0324,
        Soil: 'Gravelly red and yellow loamy top soils over clay'
    },
    {
        Name: 'Herston',
        Code: 'HE',
        Latitude: -27.4437,
        Longitude: 153.0288,
        Soil: 'Gravelly red and yellow loamy top soils over clay'
    },
    {
        Name: 'Kelvin Grove',
        Code: 'KG',
        Latitude: -27.4465,
        Longitude: 153.0122,
        Soil: 'Gravelly red and yellow loamy top soils over clay'
    },
    {
        Name: 'Newmarket',
        Code: 'NE',
        Latitude: -27.4254,
        Longitude: 153.0150,
        Soil: 'Gravelly red and yellow loamy top soils over clay'
    },
    {
        Name: 'Auchenflower',
        Code: 'AU',
        Latitude: -27.4775,
        Longitude: 152.9963,
        Soil: 'Gravelly red and yellow loamy top soils over clay'
    },
    {
        Name: 'Sherwood',
        Code: 'SW',
        Latitude: -27.5245,
        Longitude: 152.9865,
        Soil: 'Deep red loamy soils'
    },
    {
        Name: 'Corinda',
        Code: 'CD',
        Latitude: -27.5410,
        Longitude: 152.9860,
        Soil: 'Deep red loamy soils'
    },
    {
        Name: 'Graceville',
        Code: 'GV',
        Latitude: -27.5212,
        Longitude: 152.9702,
        Soil: 'Deep red loamy soils'
    },
    {
        Name: 'Chelmer',
        Code: 'CM',
        Latitude: -27.5240,
        Longitude: 152.9794,
        Soil: 'Deep red loamy soils'
    },
    {
        Name: 'Tennyson',
        Code: 'TN',
        Latitude: -27.5288,
        Longitude: 152.9857,
        Soil: 'Dark alluvial soils'
    },
    {
        Name: 'Fig Tree Pocket',
        Code: 'FT',
        Latitude: -27.5332,
        Longitude: 152.9594,
        Soil: 'Dark alluvial soils'
    },
    {
        Name: 'Kenmore Hills',
        Code: 'KH',
        Latitude: -27.5304,
        Longitude: 152.9283,
        Soil: 'Gravelly red and yellow loamy top soils over clay'
    },
    {
        Name: 'Pinjarra Hills',
        Code: 'PJ',
        Latitude: -27.5469,
        Longitude: 152.8908,
        Soil: 'Gravelly red and yellow loamy top soils over clay'
    },
    {
        Name: 'Pullenvale',
        Code: 'PV',
        Latitude: -27.5194,
        Longitude: 152.9059,
        Soil: 'Gravelly red and yellow loamy top soils over clay'
    },
    {
        Name: 'Upper Brookfield',
        Code: 'UB',
        Latitude: -27.5089,
        Longitude: 152.8892,
        Soil: 'Gravelly red and yellow loamy top soils over clay'
    },
    {
        Name: 'Rochedale',
        Code: 'RC',
        Latitude: -27.5806,
        Longitude: 153.1227,
        Soil: 'Deep red loamy soils'
    },
    {
        Name: 'Rochedale South',
        Code: 'RS',
        Latitude: -27.5984,
        Longitude: 153.1217,
        Soil: 'Not Available'
    },
    {
        Name: 'Bulimba',
        Code: 'BM',
        Latitude: -27.4475,
        Longitude: 153.0622,
        Soil: 'Dark alluvial soils'
    },
    {
        Name: 'Hawthorne',
        Code: 'HW',
        Latitude: -27.4558,
        Longitude: 153.0619,
        Soil: ''
    },
    {
        Name: 'Balmoral',
        Code: 'BL',
        Latitude: -27.4520,
        Longitude: 153.0652,
        Soil: 'Gravelly red and yellow loamy top soils over clay'
    },
    {
        Name: 'Morningside',
        Code: 'MS',
        Latitude: -27.4685,
        Longitude: 153.0734,
        Soil: 'Gravelly red and yellow loamy top soils over clay'
    },
    {
        Name: 'Norman Park',
        Code: 'NP',
        Latitude: -27.4863,
        Longitude: 153.0621,
        Soil: 'Gravelly red and yellow loamy top soils over clay'
    },
    {
        Name: 'Wacol',
        Code: 'WA',
        Latitude: -27.5845,
        Longitude: 152.9206,
        Soil: 'Gravelly red and yellow loamy top soils over clay'
    },
    {
        Name: 'Darra',
        Code: 'DA',
        Latitude: -27.5765,
        Longitude: 152.9422,
        Soil: 'Gravelly red and yellow loamy top soils over clay'
    },
    {
        Name: 'Oxley',
        Code: 'OX',
        Latitude: -27.5509,
        Longitude: 152.9773,
        Soil: 'Deep red loamy soils'
    },
    {
        Name: 'Durack',
        Code: 'DU',
        Latitude: -27.5992,
        Longitude: 152.9662,
        Soil: 'Gravelly red and yellow loamy top soils over clay'
    },
    {
        Name: 'Doolandella',
        Code: 'DO',
        Latitude: -27.6208,
        Longitude: 152.9558,
        Soil: 'Gravelly red and yellow loamy top soils over clay'
    },
    {
        Name: 'Forest Lake',
        Code: 'FL',
        Latitude: -27.6232,
        Longitude: 152.9636,
        Soil: 'Gravelly red and yellow loamy top soils over clay'
    },
    {
        Name: 'Inala',
        Code: 'IN',
        Latitude: -27.6093,
        Longitude: 152.9787,
        Soil: 'Gravelly red and yellow loamy top soils over clay'
    },
    {
        Name: 'Pallara',
        Code: 'PA',
        Latitude: -27.6227,
        Longitude: 153.0059,
        Soil: ''
    },
    {
        Name: 'Willawong',
        Code: 'WI',
        Latitude: -27.6097,
        Longitude: 153.0254,
        Soil: ''
    },
    {
        Name: 'Richlands',
        Code: 'RI',
        Latitude: -27.5980,
        Longitude: 152.9652,
        Soil: 'Gravelly red and yellow loamy top soils over clay'
    },
    {
        Name: 'Acacia Ridge',
        Code: 'AC',
        Latitude: -27.5761,
        Longitude: 153.0254,
        Soil: 'Gravelly red and yellow loamy top soils over clay'
    },
    {
        Name: 'Rocklea',
        Code: 'RO',
        Latitude: -27.5433,
        Longitude: 153.0128,
        Soil: 'Gravelly red and yellow loamy top soils over clay'
    },
    {
        Name: 'Salisbury',
        Code: 'SA',
        Latitude: -27.5541,
        Longitude: 153.0409,
        Soil: 'Gravelly red and yellow loamy top soils over clay'
    },
    {
        Name: 'Archerfield',
        Code: 'AR',
        Latitude: -27.5643,
        Longitude: 153.0112,
        Soil: ''
    },
    {
        Name: 'Coopers Plains',
        Code: 'CP',
        Latitude: -27.5652,
        Longitude: 153.0348,
        Soil: ''
    },
    {
        Name: 'Moorooka',
        Code: 'MO',
        Latitude: -27.5358,
        Longitude: 153.0284,
        Soil: ''
    },
    {
        Name: 'Tarragindi',
        Code: 'TA',
        Latitude: -27.5280,
        Longitude: 153.0361,
        Soil: 'Gravelly red and yellow loamy top soils over clay'
    },
    {
        Name: 'Moorooka',
        Code: 'MO',
        Latitude: -27.5358,
        Longitude: 153.0284,
        Soil: ''
    },
    {
        Name: 'Robertson',
        Code: 'RO',
        Latitude: -27.5648,
        Longitude: 153.0575,
        Soil: ''
    },
    {
        Name: 'Brisbane Airport',
        Code: 'BA',
        Latitude: -27.3945,
        Longitude: 153.1189,
        Soil: ''
    },
    {
        Name: 'Pinkenba',
        Code: 'PI',
        Latitude: -27.4230,
        Longitude: 153.1332,
        Soil: 'Gravelly red and yellow loamy top soils over clay'
    },
    {
        Name: 'Nudgee',
        Code: 'NU',
        Latitude: -27.3919,
        Longitude: 153.0998,
        Soil: 'Deep red loamy soils'
    },
    {
        Name: 'Nundah',
        Code: 'ND',
        Latitude: -27.4019,
        Longitude: 153.0637,
        Soil: 'Gravelly red and yellow loamy top soils over clay'
    },
    {
        Name: 'Virginia',
        Code: 'VI',
        Latitude: -27.3720,
        Longitude: 153.0437,
        Soil: 'Gravelly red and yellow loamy top soils over clay'
    },
    {
        Name: 'Geebung',
        Code: 'GE',
        Latitude: -27.3745,
        Longitude: 153.0388,
        Soil: 'Gravelly red and yellow loamy top soils over clay'
    },
    {
        Name: 'Zillmere',
        Code: 'ZI',
        Latitude: -27.3614,
        Longitude: 153.0373,
        Soil: 'Gravelly red and yellow loamy top soils over clay'
    },
    {
        Name: 'Boondall',
        Code: 'BO',
        Latitude: -27.3472,
        Longitude: 153.0630,
        Soil: 'Deep red loamy soils'
    },
    {
        Name: 'Deagon',
        Code: 'DE',
        Latitude: -27.3257,
        Longitude: 153.0631,
        Soil: 'Gravelly red and yellow loamy top soils over clay'
    },
    {
        Name: 'Sandgate',
        Code: 'SA',
        Latitude: -27.3203,
        Longitude: 153.0682,
        Soil: ''
    },
    {
        Name: 'Shorncliffe',
        Code: 'SH',
        Latitude: -27.3272,
        Longitude: 153.0782,
        Soil: ''
    },
    {
        Name: 'Bracken Ridge',
        Code: 'BR',
        Latitude: -27.3170,
        Longitude: 153.0335,
        Soil: ''
    },
    {
        Name: 'Bald Hills',
        Code: 'BH',
        Latitude: -27.3262,
        Longitude: 153.0005,
        Soil: ''
    },
    {
        Name: 'Strathpine',
        Code: 'ST',
        Latitude: -27.3104,
        Longitude: 152.9926,
        Soil: ''
    },
    {
        Name: 'Lawnton',
        Code: 'LA',
        Latitude: -27.2823,
        Longitude: 152.9892,
        Soil: 'Not Available'
    },
    {
        Name: 'Petrie',
        Code: 'PE',
        Latitude: -27.2680,
        Longitude: 152.9786,
        Soil: 'Not Available'
    },
    {
        Name: 'Kallangur',
        Code: 'KA',
        Latitude: -27.2552,
        Longitude: 152.9938,
        Soil: 'Not Available'
    },
    {
        Name: 'Murrumba Downs',
        Code: 'MU',
        Latitude: -27.2619,
        Longitude: 153.0102,
        Soil: 'Not Available'
    },
    {
        Name: 'Griffin',
        Code: 'GR',
        Latitude: -27.2695,
        Longitude: 153.0219,
        Soil: ''
    },
    {
        Name: 'Mango Hill',
        Code: 'MH',
        Latitude: -27.2417,
        Longitude: 153.0333,
        Soil: 'Not Available'
    },
    {
        Name: 'Murarrie',
        Code: 'MU',
        Latitude: -27.4557,
        Longitude: 153.1303,
        Soil: ''
    },
    {
        Name: 'Tingalpa',
        Code: 'TI',
        Latitude: -27.4490,
        Longitude: 153.1315,
        Soil: 'Gravelly red and yellow loamy top soils over clay'
    },
    {
        Name: 'Lytton',
        Code: 'LY',
        Latitude: -27.4435,
        Longitude: 153.1769,
        Soil: 'Gravelly red and yellow loamy top soils over clay'
    },
    {
        Name: 'Port of Brisbane',
        Code: 'PB',
        Latitude: -27.4280,
        Longitude: 153.1585,
        Soil: 'Not Available'
    },
    {
        Name: 'Hamilton',
        Code: 'HA',
        Latitude: -27.4382,
        Longitude: 153.0721,
        Soil: ''
    },
    {
        Name: 'Ascot',
        Code: 'AS',
        Latitude: -27.4301,
        Longitude: 153.0703,
        Soil: 'Shallow gravelly soils'
    },
    {
        Name: 'Clayfield',
        Code: 'CL',
        Latitude: -27.4161,
        Longitude: 153.0634,
        Soil: ''
    },
    {
        Name: 'Hendra',
        Code: 'HE',
        Latitude: -27.4213,
        Longitude: 153.0666,
        Soil: ''
    },
    {
        Name: 'Nundah',
        Code: 'NU',
        Latitude: -27.4019,
        Longitude: 153.0637,
        Soil: 'Gravelly red and yellow loamy top soils over clay'
    },
    {
        Name: 'Northgate',
        Code: 'NO',
        Latitude: -27.3860,
        Longitude: 153.0653,
        Soil: 'Gravelly red and yellow loamy top soils over clay'
    },
    {
        Name: 'Wavell Heights',
        Code: 'WH',
        Latitude: -27.3851,
        Longitude: 153.0465,
        Soil: 'Gravelly red and yellow loamy top soils over clay'
    },
    {
        Name: 'Kedron',
        Code: 'KE',
        Latitude: -27.4005,
        Longitude: 153.0348,
        Soil: 'Gravelly red and yellow loamy top soils over clay'
    },
    {
        Name: 'Chermside',
        Code: 'CH',
        Latitude: -27.3861,
        Longitude: 153.0327,
        Soil: 'Gravelly red and yellow loamy top soils over clay'
    },
    {
        Name: 'Chermside West',
        Code: 'CW',
        Latitude: -27.3923,
        Longitude: 153.0179,
        Soil: 'Shallow gravelly soils'
    },
    {
        Name: 'Gordon Park',
        Code: 'GP',
        Latitude: -27.4143,
        Longitude: 153.0308,
        Soil: 'Gravelly red and yellow loamy top soils over clay'
    },
    {
        Name: 'Lutwyche',
        Code: 'LU',
        Latitude: -27.4226,
        Longitude: 153.0326,
        Soil: 'Shallow gravelly soils'
    },
    {
        Name: 'Windsor',
        Code: 'WI',
        Latitude: -27.4393,
        Longitude: 153.0324,
        Soil: ''
    },
    {
        Name: 'Wilston',
        Code: 'WS',
        Latitude: -27.4359,
        Longitude: 153.0071,
        Soil: 'Gravelly red and yellow loamy top soils over clay'
    },
    {
        Name: 'Newmarket',
        Code: 'NE',
        Latitude: -27.4254,
        Longitude: 153.0150,
        Soil: ''
    },
    {
        Name: 'Wakerley',
        Code: 'WK',
        Latitude: -27.4607,
        Longitude: 153.1348,
        Soil: 'Gravelly red and yellow loamy top soils over clay'
    },
    {
        Name: 'Ransome',
        Code: 'RA',
        Latitude: -27.4629,
        Longitude: 153.1575,
        Soil: 'Gravelly red and yellow loamy top soils over clay'
    },
    {
        Name: 'Burbank',
        Code: 'BU',
        Latitude: -27.5796,
        Longitude: 153.1180,
        Soil: 'Gravelly red and yellow loamy top soils over clay'
    },
    {
        Name: 'Gumdale',
        Code: 'GU',
        Latitude: -27.4722,
        Longitude: 153.1493,
        Soil: 'Gravelly red and yellow loamy top soils over clay'
    },
    {
        Name: 'Chandler',
        Code: 'CH',
        Latitude: -27.5321,
        Longitude: 153.1322,
        Soil: ''
    },
    {
        Name: 'Belmont',
        Code: 'BE',
        Latitude: -27.5247,
        Longitude: 153.1328,
        Soil: ''
    },
    {
        Name: 'Rochedale South',
        Code: 'RS',
        Latitude: -27.5984,
        Longitude: 153.1217,
        Soil: 'Not Available'
    },
    {
        Name: 'MacKenzie',
        Code: 'MA',
        Latitude: -27.5644,
        Longitude: 153.1348,
        Soil: ''
    },
    {
        Name: 'Kuraby',
        Code: 'KU',
        Latitude: -27.6145,
        Longitude: 153.0918,
        Soil: 'Deep red loamy soils'
    },
    {
        Name: 'Underwood',
        Code: 'UN',
        Latitude: -27.6074,
        Longitude: 153.1234,
        Soil: 'Not Available'
    },
    {
        Name: 'Woodridge',
        Code: 'WO',
        Latitude: -27.6344,
        Longitude: 153.1131,
        Soil: 'Not Available'
    },
    {
        Name: 'Daisy Hill',
        Code: 'DA',
        Latitude: -27.6588,
        Longitude: 153.1588,
        Soil: ''
    },
    {
        Name: 'Shailer Park',
        Code: 'SH',
        Latitude: -27.6630,
        Longitude: 153.1608,
        Soil: ''
    },
    {
        Name: 'Tanah Merah',
        Code: 'TM',
        Latitude: -27.6827,
        Longitude: 153.1501,
        Soil: 'Not Available'
    },
    {
        Name: 'Loganholme',
        Code: 'LO',
        Latitude: -27.6771,
        Longitude: 153.1576,
        Soil: 'Not Available'
    },
    {
        Name: 'Eagleby',
        Code: 'EA',
        Latitude: -27.7140,
        Longitude: 153.1997,
        Soil: 'Not Available'
    },
    {
        Name: 'Alberton',
        Code: 'AL',
        Latitude: -27.7141,
        Longitude: 153.2933,
        Soil: ''
    },
    {
        Name: 'Yatala',
        Code: 'YA',
        Latitude: -27.7742,
        Longitude: 153.2204,
        Soil: ''
    },
    {
        Name: 'Stapylton',
        Code: 'ST',
        Latitude: -27.7673,
        Longitude: 153.2532,
        Soil: ''
    },
    {
        Name: 'Mansfield',
        Code: 'MS',
        Latitude: -27.5465,
        Longitude: 153.1035,
        Soil: ''
    },
    {
        Name: 'Mount Gravatt',
        Code: 'MG',
        Latitude: -27.5412,
        Longitude: 153.0755,
        Soil: 'Shallow gravelly soils'
    },
    {
        Name: 'MacGregor',
        Code: 'MC',
        Latitude: -27.5731,
        Longitude: 153.0836,
        Soil: 'Deep red loamy soils'
    },
    {
        Name: 'Robertson',
        Code: 'RB',
        Latitude: -27.5648,
        Longitude: 153.0575,
        Soil: ''
    },
    {
        Name: 'Sunnybank',
        Code: 'SB',
        Latitude: -27.5705,
        Longitude: 153.0614,
        Soil: 'Deep red loamy soils'
    },
    {
        Name: 'Sunnybank Hills',
        Code: 'SH',
        Latitude: -27.6062,
        Longitude: 153.0486,
        Soil: 'Deep red loamy soils'
    },
    {
        Name: 'Algester',
        Code: 'AG',
        Latitude: -27.6167,
        Longitude: 153.0300,
        Soil: 'Gravelly red and yellow loamy top soils over clay'
    },
    {
        Name: 'Calamvale',
        Code: 'CA',
        Latitude: -27.6185,
        Longitude: 153.0553,
        Soil: ''
    },
    {
        Name: 'Parkinson',
        Code: 'PK',
        Latitude: -27.6462,
        Longitude: 153.0470,
        Soil: 'Gravelly red and yellow loamy top soils over clay'
    },
    {
        Name: 'Drewvale',
        Code: 'DV',
        Latitude: -27.6433,
        Longitude: 153.0607,
        Soil: 'Gravelly red and yellow loamy top soils over clay'
    }
];

// Use a map to track unique suburb names
const uniqueNames = new Map();

// Filter the suburb data array to remove duplicates based on the 'Name' property
const filteredSuburbData = suburbData.filter(suburb => {
    if (!uniqueNames.has(suburb.Name)) {
        uniqueNames.set(suburb.Name, true);
        return true;
    }
    return false;
});

// Insert suburb data into the database
db.serialize(() => {
    // Prepare SQL statement
    const stmt = db.prepare(
        'INSERT OR IGNORE INTO Suburb (SuburbName, SuburbCode, SuburbLatitude, SuburbLongitude, SuburbSoil) VALUES (?,?,?,?,?)'
    );


    // Insert each suburb data into the table
    filteredSuburbData.forEach(suburb => {
        stmt.run(
            suburb.Name,
            suburb.Code,
            suburb.Latitude,
            suburb.Longitude,
            suburb.Soil
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
