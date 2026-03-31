const Post = require('../models/Post');

const create = (payload) => Post.create(payload);

const findById = (id) =>
  Post.findById(id).populate('author', 'username email role');

const updateById = (id, payload) =>
  Post.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  }).populate('author', 'username email role');

const deleteById = (id) => Post.findByIdAndDelete(id);

const findAll = async ({ page, limit }) => {
  const skip = (page - 1) * limit;
  const [items, total] = await Promise.all([
    Post.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('author', 'username email role'),
    Post.countDocuments(),
  ]);

  return { items, total };
};

const findByAuthor = (authorId) =>
  Post.find({ author: authorId })
    .sort({ createdAt: -1 })
    .populate('author', 'username email role');

const search = ({ q, tag }) => {
  const query = {};

  if (q) {
    query.$or = [
      { title: { $regex: q, $options: 'i' } },
      { content: { $regex: q, $options: 'i' } },
    ];
  }

  if (tag) {
    query.tags = { $in: [tag] };
  }

  return Post.find(query)
    .sort({ createdAt: -1 })
    .populate('author', 'username email role');
};

module.exports = {
  create,
  findById,
  updateById,
  deleteById,
  findAll,
  findByAuthor,
  search,
};
