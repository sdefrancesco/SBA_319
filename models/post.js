const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    minlength: [5, 'Title must be at least 5 characters long'],
    maxlength: [100, 'Title cannot exceed 100 characters'],
    index: true, // Indexed for faster search and filtering
  },
  body: {
    type: String,
    required: [true, 'Body is required'],
    minlength: [10, 'Body must be at least 10 characters long'],
    maxlength: [5000, 'Body cannot exceed 5000 characters'],
    // Not indexed because this may be a paragraph or longer
  },
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);
