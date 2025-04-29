const mongoose = require('mongoose');
const Post = require('./models/post');
const User = require('./models/user');
const Article = require('./models/article');
require('dotenv').config();

async function seedData() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB, seeding data');
    
    // Sample data for Posts
    const posts = [
      { title: 'Post 1', body: 'This is post 1.' },
      { title: 'Post 2', body: 'This is post 2.' },
      { title: 'Post 3', body: 'This is post 3.' },
      { title: 'Post 4', body: 'This is post 4.' },
      { title: 'Post 5', body: 'This is post 5.' },
    ];

    // Sample data for Users
    const users = [
      { name: 'John Doe', email: 'john@example.com', dob: '1990-01-01' },
      { name: 'Jane Smith', email: 'jane@example.com', dob: '1985-02-02' },
      { name: 'Alice Johnson', email: 'alice@example.com', dob: '1992-03-03' },
      { name: 'Bob Lee', email: 'bob@example.com', dob: '1980-04-04' },
      { name: 'Charlie Brown', email: 'charlie@example.com', dob: '1975-05-05' },
    ];

    // Sample data for Articles
    const articles = [
        { title: 'Article 1', body: 'This is article 1.', author: 'Jane Smith' },
        { title: 'Article 2', body: 'This is article 2.', author: 'Jane Smith' },
        { title: 'Article 3', body: 'This is article 3.', author: 'Jane Smith' },
        { title: 'Article 4', body: 'This is article 4.', author: 'Jane Smith' },
        { title: 'Article 5', body: 'This is article 5.', author: 'Jane Smith' },
    ];

    // Insert the data
    await Post.insertMany(posts);
    await User.insertMany(users);
    await Article.insertMany(articles);

    console.log('Sample data inserted');
  } catch (err) {
    console.error('Error inserting data:', err);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

seedData();
