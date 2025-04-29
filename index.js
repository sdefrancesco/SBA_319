const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')


const app = express()
const db = mongoose.connect('mongodb+srv://sdefrancesco:DJIInspire193@perscholas.cmjlsom.mongodb.net/', {
  })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
p.use(bodyParser.urlencoded({ extended: true }))



// import models
const Post = require('./models/post.js')

// routes
app.get('/api/posts', async (req, res) => {
    try {
        const posts = await Post.find()

        res.json(posts)
    } catch(err) {
        console.log(err)
        res.send(err.message)
    }
})
app.post('/api/posts', async (req, res) => {
    try {
        let newPost = new Post(req.body)
        let savedPost = await newPost.save()
        res.json(savedPost)
    } catch(err) {
        console.log(err)
        res.send(err.message)
    }
})





const PORT = 3000

app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`)
})