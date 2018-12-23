const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ArticleSchema = new Schema({

  title: {
    type: String,
    required: true
  },

  author: {
    type: String
  },

  description: {
    type: String
  },
  
  link: {
    type: String,
    required: true,
    unique: true
  },

  publishedDate: {
    type: Date,
    required: true
  }
})

const Article = mongoose.model('Article', ArticleSchema)

module.exports = Article