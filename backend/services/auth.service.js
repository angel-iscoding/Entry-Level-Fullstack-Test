const jwt = require('jsonwebtoken');

const generateToken = () => {
  const payload = {
    userId: -1
  };

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET environment variable is not defined');
  }

  // Sign token with expiration (e.g., 1 hour)
  const token = jwt.sign(payload, secret, { expiresIn: '1h' });

  return token;
};

module.exports = {
  generateToken
};
