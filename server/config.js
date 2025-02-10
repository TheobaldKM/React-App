const crypto = require('crypto');

// Function to generate random kkey
const generateRandomKey = (length) => {
    return crypto.randomBytes(length).toString('hex');
  };

const secretKey = generateRandomKey(32);

module.exports = {
    secretKey: secretKey
  };
  