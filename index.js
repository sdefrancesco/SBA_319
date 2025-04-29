const express = require('express')


const app = express()

app.use(express.json());


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