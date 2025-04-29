const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv').config();


const app = express()

const MONGO_URI = process.env.MONGO_URI
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to DB');
  })
  .catch((err) => {
    console.error('Error connecting to DB:', err);
  });

// middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({ extended: true }))



// import models
const Post = require('./models/post.js')
const User = require('./models/user.js')


// import routes
const postRoutes = require('./routes/post');
const userRoutes = require('./routes/user');
const articleRoutes = require('./routes/article');

// middleware for routes
app.use(postRoutes);
app.use(userRoutes);
app.use(articleRoutes);




const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`)
})