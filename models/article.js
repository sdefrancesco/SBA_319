const mongoose = require('mongoose')

const ArticleSchema = mongoose.Schema({
    title: {
      type: String,
      index: true, // Indexed for faster search and filtering
    },
    body: {
      type: String,
      // Not indexed because this may be a paragraph or longer
    },
    author: {
        type: String
    }
  }, { timestamps: true });


module.exports = mongoose.model('Article', ArticleSchema);