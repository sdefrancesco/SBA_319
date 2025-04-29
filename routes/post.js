const express = require('express');
const router = express.Router();
const Post = require('../models/post');

// GET all posts
router.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// GET a post by ID
router.get('/posts/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).send('Post not found');
    res.json(post);
  } catch (err) {
    console.error(err);
    if (err.kind === 'ObjectId') {
      return res.status(400).send('Invalid Post ID format');
    }
    res.status(500).send('Internal Server Error');
  }
});

// CREATE a new post
router.post('/posts', async (req, res) => {
  try {
    const newPost = new Post(req.body);
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    console.error(err);
    // Check if it's a validation error
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        message: 'Validation Error',
        errors: err.errors,
      });
    }
    res.status(500).send('Internal Server Error');
  }
});

// UPDATE a post
router.put('/posts/:id', async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedPost) return res.status(404).send('Post not found');
    res.json(updatedPost);
  } catch (err) {
    console.error(err);
    // Check if it's a validation error
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        message: 'Validation Error',
        errors: err.errors,
      });
    }
    res.status(500).send('Internal Server Error');
  }
});

// DELETE a post
router.delete('/posts/:id', async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) return res.status(404).send('Post not found');
    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
