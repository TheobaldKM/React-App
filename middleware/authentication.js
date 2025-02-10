const jwt = require('jsonwebtoken');
const config = require('../server/config'); 

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.secretKey, (err, decoded) => { 
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
};

const authenticateUser = async (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = await verifyToken(token);
    req.userId = decoded.userId; 
    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    return res.status(401).json({ error: 'Unauthorized' });
  }
};

module.exports = authenticateUser;
