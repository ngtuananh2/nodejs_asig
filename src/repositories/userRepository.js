const User = require('../models/User');

const create = (payload) => User.create(payload);
const findByEmail = (email) => User.findOne({ email });
const findByUsername = (username) => User.findOne({ username });
const findById = (id) => User.findById(id);

module.exports = {
  create,
  findByEmail,
  findByUsername,
  findById,
};
