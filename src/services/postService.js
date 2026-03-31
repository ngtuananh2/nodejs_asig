const mongoose = require('mongoose');
const postRepository = require('../repositories/postRepository');
const ApiError = require('../utils/ApiError');

const ensureValidObjectId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, 'Invalid id format');
  }
};

const parseTags = (tags) => {
  if (!tags) return [];
  if (Array.isArray(tags)) return tags;

  return String(tags)
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean);
};

const getAllPosts = async ({ page, limit }) => {
  const normalizedPage = Math.max(parseInt(page, 10) || 1, 1);
  const normalizedLimit = Math.max(parseInt(limit, 10) || 10, 1);

  const { items, total } = await postRepository.findAll({
    page: normalizedPage,
    limit: normalizedLimit,
  });

  return {
    data: items,
    pagination: {
      page: normalizedPage,
      limit: normalizedLimit,
      total,
      totalPages: Math.ceil(total / normalizedLimit),
    },
  };
};

const getPostById = async (id) => {
  ensureValidObjectId(id);
  const post = await postRepository.findById(id);

  if (!post) {
    throw new ApiError(404, 'Post not found');
  }

  return post;
};

const createPost = async ({ title, content, tags, imageUrl, authorId }) => {
  return postRepository.create({
    title,
    content,
    tags: parseTags(tags),
    imageUrl,
    author: authorId,
  });
};

const updatePost = async ({ id, title, content, tags, imageUrl, currentUser }) => {
  ensureValidObjectId(id);

  const existingPost = await postRepository.findById(id);
  if (!existingPost) {
    throw new ApiError(404, 'Post not found');
  }

  const isOwner = existingPost.author._id.toString() === currentUser.id;
  const isAdmin = currentUser.role === 'admin';

  if (!isOwner && !isAdmin) {
    throw new ApiError(403, 'You are not allowed to update this post');
  }

  const payload = {
    title,
    content,
    tags: parseTags(tags),
  };

  if (imageUrl) {
    payload.imageUrl = imageUrl;
  }

  return postRepository.updateById(id, payload);
};

const deletePost = async ({ id, currentUser }) => {
  ensureValidObjectId(id);

  const existingPost = await postRepository.findById(id);
  if (!existingPost) {
    throw new ApiError(404, 'Post not found');
  }

  const isOwner = existingPost.author._id.toString() === currentUser.id;
  const isAdmin = currentUser.role === 'admin';

  if (!isOwner && !isAdmin) {
    throw new ApiError(403, 'You are not allowed to delete this post');
  }

  await postRepository.deleteById(id);
};

const getMyPosts = async (authorId) => postRepository.findByAuthor(authorId);

const searchPosts = async ({ q, tag }) => postRepository.search({ q, tag });

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  getMyPosts,
  searchPosts,
};
