const express = require('express')


const app = express()

// import models
const Post = require('./models/post.js')

app.get('/api/posts', async (req, res) => {
    
    try {
        const posts = await Post.find()

        res.json(posts)
    } catch(err) {
        console.log(err)
        res.send(err.message)
    }
})





const PORT = 3000

app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`)
})