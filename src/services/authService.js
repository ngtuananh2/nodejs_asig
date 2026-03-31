const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/userRepository');
const ApiError = require('../utils/ApiError');
const { jwtSecret, jwtExpiresIn } = require('../config/env');

const signToken = (user) =>
  jwt.sign({ sub: user._id, role: user.role }, jwtSecret, {
    expiresIn: jwtExpiresIn,
  });

const register = async ({ username, email, password, role }) => {
  const [existingEmail, existingUsername] = await Promise.all([
    userRepository.findByEmail(email),
    userRepository.findByUsername(username),
  ]);

  if (existingEmail) {
    throw new ApiError(409, 'Email already exists');
  }

  if (existingUsername) {
    throw new ApiError(409, 'Username already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userRepository.create({
    username,
    email,
    password: hashedPassword,
    role: role || 'user',
  });

  return {
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
    token: signToken(user),
  };
};

const login = async ({ email, password }) => {
  const user = await userRepository.findByEmail(email);

  if (!user) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const isMatched = await bcrypt.compare(password, user.password);

  if (!isMatched) {
    throw new ApiError(401, 'Invalid email or password');
  }

  return {
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
    token: signToken(user),
  };
};

module.exports = {
  register,
  login,
};
