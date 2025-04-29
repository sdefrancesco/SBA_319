const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')


const app = express()
const db = mongoose.connect('mongodb+srv://sdefrancesco:DJIInspire193@perscholas.cmjlsom.mongodb.net/', {
  })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({ extended: true }))



// import models
const Post = require('./models/post.js')
const User = require('./models/user.js')

// routes

//  GET all posts
app.get('/api/posts', async (req, res) => {
    try {
        const posts = await Post.find()
        res.json(posts)
    } catch(err) {
        console.log(err)
        res.send(err.message)
    }
})
// GET a post by ID
app.get('/api/posts/:id', async (req, res) => {
    try {
      const post = await Post.findById(req.params.id)
      if (!post) return res.status(404).send('Post not found')
      res.json(post)
    } catch (err) {
      console.error(err)
      res.status(500).send(err.message)
    }
  })
  
  // CREATE a new post
  app.post('/api/posts', async (req, res) => {
    try {
      const newPost = new Post(req.body)
      const savedPost = await newPost.save()
      res.status(201).json(savedPost)
    } catch (err) {
      console.error(err)
      res.status(400).send(err.message)
    }
  })
  
  // UPDATE a post
  app.put('/api/posts/:id', async (req, res) => {
    try {
      const updatedPost = await Post.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      )
      if (!updatedPost) return res.status(404).send('Post not found')
      res.json(updatedPost)
    } catch (err) {
      console.error(err)
      res.status(400).send(err.message)
    }
  })
  
  // DELETE a post
  app.delete('/api/posts/:id', async (req, res) => {
    try {
      const deletedPost = await Post.findByIdAndDelete(req.params.id)
      if (!deletedPost) return res.status(404).send('Post not found')
      res.json({ message: 'Post deleted successfully' })
    } catch (err) {
      console.error(err)
      res.status(500).send(err.message)
    }
  })





const PORT = 3000

app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`)
})