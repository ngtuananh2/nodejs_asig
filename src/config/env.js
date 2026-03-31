const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/blog_api',
  jwtSecret: process.env.JWT_SECRET || 'change-me-in-env',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
  baseUrl: process.env.BASE_URL || 'http://localhost:5000',
};
