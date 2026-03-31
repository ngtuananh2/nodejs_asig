const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/env');
const userRepository = require('../repositories/userRepository');
const ApiError = require('../utils/ApiError');

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new ApiError(401, 'Authorization token is required'));
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, jwtSecret);
    const user = await userRepository.findById(payload.sub);

    if (!user) {
      return next(new ApiError(401, 'Invalid token user'));
    }

    req.user = {
      id: user._id.toString(),
      role: user.role,
      email: user.email,
      username: user.username,
    };

    return next();
  } catch (error) {
    return next(new ApiError(401, 'Invalid or expired token'));
  }
};

module.exports = authMiddleware;
