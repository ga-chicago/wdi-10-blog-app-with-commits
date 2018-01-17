const express = require('express');
const router = express.Router();

const Author = require('../models/author.js');


router.get('/', (req, res)=>{
  res.render('authors/index.ejs');
});

router.get('/new', (req, res)=>{
  res.render('authors/new.ejs');
});

router.post('/', (req, res)=>{
  Author.create(req.body, (err, createdAuthor)=>{
    res.redirect('/authors');
  });
});

module.exports = router;