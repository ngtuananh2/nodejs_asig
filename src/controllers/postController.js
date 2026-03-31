const postService = require('../services/postService');
const asyncHandler = require('../utils/asyncHandler');

const getAll = asyncHandler(async (req, res) => {
  const { page, limit } = req.query;
  const result = await postService.getAllPosts({ page, limit });
  res.status(200).json(result);
});

const getById = asyncHandler(async (req, res) => {
  const post = await postService.getPostById(req.params.id);
  res.status(200).json(post);
});

const create = asyncHandler(async (req, res) => {
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  const post = await postService.createPost({
    ...req.body,
    imageUrl,
    authorId: req.user.id,
  });

  res.status(201).json(post);
});

const update = asyncHandler(async (req, res) => {
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  const post = await postService.updatePost({
    id: req.params.id,
    ...req.body,
    imageUrl,
    currentUser: req.user,
  });

  res.status(200).json(post);
});

const remove = asyncHandler(async (req, res) => {
  await postService.deletePost({
    id: req.params.id,
    currentUser: req.user,
  });

  res.status(200).json({ message: 'Post deleted successfully' });
});

const getMyPosts = asyncHandler(async (req, res) => {
  const posts = await postService.getMyPosts(req.user.id);
  res.status(200).json(posts);
});

const search = asyncHandler(async (req, res) => {
  const { q, tag } = req.query;
  const posts = await postService.searchPosts({ q, tag });
  res.status(200).json(posts);
});

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  getMyPosts,
  search,
};
