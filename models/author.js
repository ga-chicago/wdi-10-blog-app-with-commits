const mongoose = require('mongoose');
const Article = require('./article.js');

const authorSchema = new mongoose.Schema({
  name: String,
  articles: [Article.schema]
});

const Author = mongoose.model('Author', authorSchema);

module.exports = Author;