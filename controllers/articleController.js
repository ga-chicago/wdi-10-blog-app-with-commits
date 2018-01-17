const express = require('express');
const router = express.Router();

const Article = require('../models/article.js');

router.get('/', (req, res)=>{
	res.render('articles/index.ejs');
});

router.get('/new', (req, res)=>{
  res.render('articles/new.ejs');
});

router.post('/', (req, res)=>{
  Article.create(req.body, (err, createdArticle)=>{
    res.redirect('/articles');
  });
});

module.exports = router;